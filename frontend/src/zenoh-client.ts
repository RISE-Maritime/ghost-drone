import { Config, Session, open, Duration, type Sample, type Reply, type ReplyError } from "@eclipse-zenoh/zenoh-ts";
import type { SimFrame, SettingsPayload, FaultType, OperationMode } from "./types";

const KEELSON_VERSION = "v0";
const QUERY_TIMEOUT = Duration.milliseconds.of(5000);

/**
 * ZenohClient wraps a zenoh-ts Session for browser-to-backend communication
 * via the zenoh-bridge-remote-api WebSocket bridge.
 */
export interface ManualSetpoint {
  rudder_deg: number;
  engine: number;
}

export class ZenohClient {
  private session: Session | null = null;
  private realm: string;
  private entityId: string;
  private remoteApiUrl: string;
  private onFrame: (frame: SimFrame) => void;
  private onManualSetpoint: ((entityId: string, sp: ManualSetpoint) => void) | null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(opts: {
    realm: string;
    entityId: string;
    remoteApiUrl: string;
    onFrame: (frame: SimFrame) => void;
    onManualSetpoint?: (entityId: string, sp: ManualSetpoint) => void;
  }) {
    this.realm = opts.realm;
    this.entityId = opts.entityId;
    this.remoteApiUrl = opts.remoteApiUrl;
    this.onFrame = opts.onFrame;
    this.onManualSetpoint = opts.onManualSetpoint ?? null;
  }

  private prefix(entityId?: string): string {
    return `${this.realm}/@${KEELSON_VERSION}/${entityId ?? this.entityId}`;
  }

  async connect(): Promise<void> {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    try {
      const config = new Config(this.remoteApiUrl);
      this.session = await open(config);
      console.log("[zenoh] session opened to", this.remoteApiUrl);
      await this.subscribeSimFrame();
      await this.subscribeManualSetpoint();
    } catch (err) {
      console.error("[zenoh] connection failed, retrying in 2s:", err);
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect(): void {
    this.reconnectTimer = setTimeout(() => this.connect(), 2000);
  }

  private async subscribeSimFrame(): Promise<void> {
    if (!this.session) return;
    const keyExpr = `${this.realm}/@${KEELSON_VERSION}/*/pubsub/sim_frame/engine/0`;
    await this.session.declareSubscriber(keyExpr, {
      handler: (sample: Sample) => {
        try {
          const text = sample.payload().toString();
          const frame: SimFrame = JSON.parse(text);
          this.onFrame(frame);
        } catch (e) {
          console.warn("[zenoh] bad sim_frame payload:", e);
        }
      },
    });
    console.log("[zenoh] subscribed to sim_frame (wildcard)");
  }

  private async subscribeManualSetpoint(): Promise<void> {
    if (!this.session || !this.onManualSetpoint) return;
    const keyExpr = `${this.realm}/@${KEELSON_VERSION}/*/pubsub/manual_setpoint/engine/0`;
    const cb = this.onManualSetpoint;
    await this.session.declareSubscriber(keyExpr, {
      handler: (sample: Sample) => {
        try {
          const text = sample.payload().toString();
          const sp: ManualSetpoint = JSON.parse(text);
          // Extract entity_id from key expression
          const parts = sample.keyexpr().toString().split("/");
          const eid = parts[2] ?? "";
          cb(eid, sp);
        } catch (e) {
          console.warn("[zenoh] bad manual_setpoint payload:", e);
        }
      },
    });
    console.log("[zenoh] subscribed to manual_setpoint (wildcard)");
  }

  // --- Per-entity pub/sub control commands ---

  async playFor(entityId: string): Promise<void> {
    await this.session?.put(`${this.prefix(entityId)}/control/play`, "");
  }

  async pauseFor(entityId: string): Promise<void> {
    await this.session?.put(`${this.prefix(entityId)}/control/pause`, "");
  }

  async stopFor(entityId: string): Promise<void> {
    await this.session?.put(`${this.prefix(entityId)}/control/stop`, "");
  }

  async setSpeedFor(entityId: string, speed: number): Promise<void> {
    await this.session?.put(
      `${this.prefix(entityId)}/control/set_speed`,
      JSON.stringify({ value: speed }),
    );
  }

  async setModeFor(entityId: string, mode: OperationMode): Promise<void> {
    await this.session?.put(
      `${this.prefix(entityId)}/control/set_mode`,
      JSON.stringify({ mode }),
    );
  }

  async manualControlFor(entityId: string, rudderDeg: number, engine: number): Promise<void> {
    await this.session?.put(
      `${this.prefix(entityId)}/control/manual`,
      JSON.stringify({ rudder_deg: rudderDeg, engine }),
    );
  }

  // --- Backward-compat single-entity methods ---

  async play(): Promise<void> { return this.playFor(this.entityId); }
  async pause(): Promise<void> { return this.pauseFor(this.entityId); }
  async stop(): Promise<void> { return this.stopFor(this.entityId); }
  async setSpeed(speed: number): Promise<void> { return this.setSpeedFor(this.entityId, speed); }

  // --- Queryable/Get for request-response ---

  private isSample(result: Sample | ReplyError): result is Sample {
    return typeof (result as Sample).keyexpr === "function";
  }

  async setHomeFor(entityId: string, lat: number, lng: number): Promise<{ ok: boolean; error?: string }> {
    if (!this.session) return { ok: false, error: "not connected" };
    const receiver = await this.session.get(
      `${this.prefix(entityId)}/service/set_home`,
      { payload: JSON.stringify({ lat, lng }), timeout: QUERY_TIMEOUT },
    );
    if (!receiver) return { ok: false, error: "no reply channel" };
    try {
      const reply: Reply = await receiver.receive();
      const result = reply.result();
      if (this.isSample(result)) {
        const text = result.payload().toString();
        return JSON.parse(text);
      } else {
        const errPayload = (result as ReplyError).payload().toString();
        return { ok: false, error: errPayload };
      }
    } catch {
      return { ok: false, error: "query timeout" };
    }
  }

  async loadRouteFor(entityId: string, waypoints: [number, number][]): Promise<{ ok: boolean; error?: string }> {
    if (!this.session) return { ok: false, error: "not connected" };
    const receiver = await this.session.get(
      `${this.prefix(entityId)}/service/load_route`,
      { payload: JSON.stringify({ waypoints }), timeout: QUERY_TIMEOUT },
    );
    if (!receiver) return { ok: false, error: "no reply channel" };
    try {
      const reply: Reply = await receiver.receive();
      const result = reply.result();
      if (this.isSample(result)) {
        const text = result.payload().toString();
        return JSON.parse(text);
      } else {
        const errPayload = (result as ReplyError).payload().toString();
        return { ok: false, error: errPayload };
      }
    } catch {
      return { ok: false, error: "query timeout" };
    }
  }

  async loadRoute(waypoints: [number, number][]): Promise<{ ok: boolean; error?: string }> {
    return this.loadRouteFor(this.entityId, waypoints);
  }

  async spawnDrone(lat: number, lng: number): Promise<{ ok: boolean; entity_id?: string; error?: string }> {
    if (!this.session) return { ok: false, error: "not connected" };
    const receiver = await this.session.get(
      `${this.realm}/@${KEELSON_VERSION}/service/spawn_drone`,
      { payload: JSON.stringify({ lat, lng }), timeout: QUERY_TIMEOUT },
    );
    if (!receiver) return { ok: false, error: "no reply channel" };
    try {
      const reply: Reply = await receiver.receive();
      const result = reply.result();
      if (this.isSample(result)) {
        const text = result.payload().toString();
        return JSON.parse(text);
      } else {
        const errPayload = (result as ReplyError).payload().toString();
        return { ok: false, error: errPayload };
      }
    } catch {
      return { ok: false, error: "query timeout" };
    }
  }

  async deleteDrone(entityId: string): Promise<{ ok: boolean; error?: string }> {
    if (!this.session) return { ok: false, error: "not connected" };
    const receiver = await this.session.get(
      `${this.realm}/@${KEELSON_VERSION}/service/delete_drone`,
      { payload: JSON.stringify({ entity_id: entityId }), timeout: QUERY_TIMEOUT },
    );
    if (!receiver) return { ok: false, error: "no reply channel" };
    try {
      const reply: Reply = await receiver.receive();
      const result = reply.result();
      if (this.isSample(result)) {
        const text = result.payload().toString();
        return JSON.parse(text);
      } else {
        const errPayload = (result as ReplyError).payload().toString();
        return { ok: false, error: errPayload };
      }
    } catch {
      return { ok: false, error: "query timeout" };
    }
  }

  async listDrones(): Promise<{ ok: boolean; drones?: { entity_id: string; state: string }[]; error?: string }> {
    if (!this.session) return { ok: false, error: "not connected" };
    const receiver = await this.session.get(
      `${this.realm}/@${KEELSON_VERSION}/service/list_drones`,
      { timeout: QUERY_TIMEOUT },
    );
    if (!receiver) return { ok: false, error: "no reply channel" };
    try {
      const reply: Reply = await receiver.receive();
      const result = reply.result();
      if (this.isSample(result)) {
        const text = result.payload().toString();
        return JSON.parse(text);
      } else {
        const errPayload = (result as ReplyError).payload().toString();
        return { ok: false, error: errPayload };
      }
    } catch {
      return { ok: false, error: "query timeout" };
    }
  }

  async getSettingsFor(entityId: string): Promise<SettingsPayload | null> {
    if (!this.session) return null;
    const receiver = await this.session.get(
      `${this.prefix(entityId)}/service/settings`,
      { timeout: QUERY_TIMEOUT },
    );
    if (!receiver) return null;
    try {
      const reply: Reply = await receiver.receive();
      const result = reply.result();
      if (this.isSample(result)) {
        const text = result.payload().toString();
        return JSON.parse(text);
      }
      return null;
    } catch {
      return null;
    }
  }

  async getSettings(): Promise<SettingsPayload | null> {
    return this.getSettingsFor(this.entityId);
  }

  async injectFaultFor(entityId: string, subject: string, faultType: FaultType): Promise<boolean> {
    if (!this.session) return false;
    const receiver = await this.session.get(
      `${this.prefix(entityId)}/service/fault`,
      {
        payload: JSON.stringify({ action: "inject", subject, fault_type: faultType }),
        timeout: QUERY_TIMEOUT,
      },
    );
    if (!receiver) return false;
    try {
      const reply: Reply = await receiver.receive();
      const result = reply.result();
      if (this.isSample(result)) {
        const data = JSON.parse(result.payload().toString());
        return data.ok === true;
      }
      return false;
    } catch {
      return false;
    }
  }

  async injectFault(subject: string, faultType: FaultType): Promise<boolean> {
    return this.injectFaultFor(this.entityId, subject, faultType);
  }

  async clearFaultFor(entityId: string, subject: string, faultType: FaultType): Promise<boolean> {
    if (!this.session) return false;
    const receiver = await this.session.get(
      `${this.prefix(entityId)}/service/fault`,
      {
        payload: JSON.stringify({ action: "clear", subject, fault_type: faultType }),
        timeout: QUERY_TIMEOUT,
      },
    );
    if (!receiver) return false;
    try {
      const reply: Reply = await receiver.receive();
      const result = reply.result();
      if (this.isSample(result)) {
        const data = JSON.parse(result.payload().toString());
        return data.ok === true;
      }
      return false;
    } catch {
      return false;
    }
  }

  async clearFault(subject: string, faultType: FaultType): Promise<boolean> {
    return this.clearFaultFor(this.entityId, subject, faultType);
  }

  async updateSettingsFor(entityId: string, payload: SettingsPayload): Promise<SettingsPayload | null> {
    if (!this.session) return null;
    const receiver = await this.session.get(
      `${this.prefix(entityId)}/service/settings`,
      { payload: JSON.stringify(payload), timeout: QUERY_TIMEOUT },
    );
    if (!receiver) return null;
    try {
      const reply: Reply = await receiver.receive();
      const result = reply.result();
      if (this.isSample(result)) {
        const text = result.payload().toString();
        return JSON.parse(text);
      }
      return null;
    } catch {
      return null;
    }
  }

  async updateSettings(payload: SettingsPayload): Promise<SettingsPayload | null> {
    return this.updateSettingsFor(this.entityId, payload);
  }
}
