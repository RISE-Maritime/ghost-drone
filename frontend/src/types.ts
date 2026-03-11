export interface SimFrame {
  lat: number;
  lng: number;
  heading: number;
  speed: number;
  roll: number;
  pitch: number;
  state: "stopped" | "playing" | "paused";
}

export interface SettingsPayload {
  subjects: Record<string, { rate_hz: number; source_id: string }>;
  roll_amplitude_deg: number;
  roll_period_s: number;
  pitch_amplitude_deg: number;
  pitch_period_s: number;
  location_noise_sigma_m: number;
}
