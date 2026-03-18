export interface SubsystemHealth {
  name: string;
  level: "nominal" | "degraded" | "critical" | "inactive" | "unknown";
  detail: string;
}

export interface HealthSummary {
  level: "nominal" | "degraded" | "critical" | "inactive" | "unknown";
  subsystems: SubsystemHealth[];
}

export type FaultType = "drop" | "stuck" | "nan" | "wrong_rate";

export type FaultState = Record<string, FaultType[]>;

export type OperationMode = "autonomous" | "operated";

export interface SimFrame {
  entity_id: string;
  lat: number;
  lng: number;
  heading: number;
  speed: number;
  roll: number;
  pitch: number;
  rudder_deg?: number;
  thrust_pct?: number;
  state: string;
  operation_mode?: OperationMode;
  health?: HealthSummary;
  faults?: FaultState;
}

export interface SettingsPayload {
  subjects: Record<string, { rate_hz: number; source_id: string }>;
  location_noise_sigma_m: number;
}
