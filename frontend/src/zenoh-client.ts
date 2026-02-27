import { Config, Session, open, Duration, type Sample, type Reply, type ReplyError } from "@eclipse-zenoh/zenoh-ts";
import type { SimFrame, SettingsPayload } from "./types";

const QUERY_TIMEOUT = Duration.milliseconds.of(5000);

/**
 * ZenohClient wraps a zenoh-ts Session for browser-to-backend communication
 * via the zenoh-bridge-remote-api WebSocket bridge.
 */
export class ZenohClient {
  private session: Session | null = null;
  private realm: string;
  private entityId: string;
  private remoteApiUrl: string;
  private onFrame: (frame: SimFrame) => void;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(opts: {
    realm: string;
    entityId: string;
    remoteApiUrl: string;
    onFrame: (frame: SimFrame) => void;
  }) {
    this.realm = opts.realm;
    this.entityId = opts.entityId;
    this.remoteApiUrl = opts.remoteApiUrl;
    this.onFrame = opts.onFrame;
  }

  private prefix(): string {
    return `${this.realm}/@v1/${this.entityId}`;
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
    const keyExpr = `${this.prefix()}/pubsub/sim_frame/engine/0`;
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
    console.log("[zenoh] subscribed to sim_frame");
  }

  // --- Pub/Sub control commands ---

  async play(): Promise<void> {
    await this.session?.put(`${this.prefix()}/control/play`, "");
  }

  async pause(): Promise<void> {
    await this.session?.put(`${this.prefix()}/control/pause`, "");
  }

  async stop(): Promise<void> {
    await this.session?.put(`${this.prefix()}/control/stop`, "");
  }

  async setSpeed(speed: number): Promise<void> {
    await this.session?.put(
      `${this.prefix()}/control/set_speed`,
      JSON.stringify({ value: speed }),
    );
  }

  // --- Queryable/Get for request-response ---

  private isSample(result: Sample | ReplyError): result is Sample {
    return typeof (result as Sample).keyexpr === "function";
  }

  async loadRoute(waypoints: [number, number][]): Promise<{ ok: boolean; error?: string }> {
    if (!this.session) return { ok: false, error: "not connected" };
    const receiver = await this.session.get(
      `${this.prefix()}/service/load_route`,
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

  async getSettings(): Promise<SettingsPayload | null> {
    if (!this.session) return null;
    const receiver = await this.session.get(
      `${this.prefix()}/service/settings`,
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

  async updateSettings(payload: SettingsPayload): Promise<SettingsPayload | null> {
    if (!this.session) return null;
    const receiver = await this.session.get(
      `${this.prefix()}/service/settings`,
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
}
