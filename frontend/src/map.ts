import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import { cssVar } from "./theme";

export interface Waypoint {
  lat: number;
  lng: number;
}

export class MapController {
  readonly map: L.Map;
  waypoints: Waypoint[] = [];
  private droneRoutes: Map<string, Waypoint[]> = new Map();
  private wpMarkers: L.Marker[] = [];
  private routeLayer: L.Polyline | null = null;
  private droneMarkers: Map<string, L.Marker> = new Map();
  private droneOpacities: Map<string, number> = new Map();
  private isZooming = false;
  private isProgrammaticMove = false;
  following = false;
  private followBtn!: HTMLButtonElement;
  drawModeActive = false;
  spawnModeActive = false;
  geofenceModeActive = false;
  selectedDroneId: string | null = null;

  // Geofence state
  geofenceVertices: Waypoint[] = [];
  private droneGeofences: Map<string, Waypoint[]> = new Map();
  private geofenceMarkers: L.Marker[] = [];
  private geofenceLayer: L.Polygon | null = null;

  /** External callback for control state refresh */
  onWaypointsChanged: () => void = () => {};

  /** External callback when geofence vertices change */
  onGeofenceChanged: () => void = () => {};

  /** External callback for spawn-on-click */
  onSpawnClick: ((lat: number, lng: number) => void) | null = null;

  /** External callback when a drone marker is clicked to select it */
  onDroneSelected: ((entityId: string) => void) | null = null;

  /** External callback when a drone marker is dragged to a new position */
  onDroneDragged: ((entityId: string, lat: number, lng: number) => void) | null = null;

  private droneStates: Map<string, string> = new Map();
  /** Timestamps until which position updates are frozen (after drag) */
  private droneFrozenUntil: Map<string, number> = new Map();

  constructor() {
    this.map = L.map("map", { zoomAnimation: true }).setView([57.7069, 11.9381], 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap",
    }).addTo(this.map);

    (this.map as any).pm.addControls({
      position: "topleft",
      drawMarker: false, drawCircle: false, drawCircleMarker: false,
      drawPolygon: false, drawRectangle: false, drawText: false,
      editMode: false, dragMode: false, cutPolygon: false,
      removalMode: false, rotateMode: false, drawPolyline: false,
    });

    this.map.on("zoomstart", () => { this.isZooming = true; });
    this.map.on("zoomend", () => { this.isZooming = false; });

    // Disable follow on user drag (not programmatic pan)
    this.map.on("dragstart", () => {
      if (!this.isProgrammaticMove) {
        this.setFollowing(false);
      }
    });

    // Follow button (Leaflet custom control)
    const FollowControl = L.Control.extend({
      options: { position: "topright" },
      onAdd: () => {
        const btn = L.DomUtil.create("button", "leaflet-follow-btn") as HTMLButtonElement;
        btn.type = "button";
        btn.title = "Follow selected drone";
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`;
        L.DomEvent.disableClickPropagation(btn);
        btn.addEventListener("click", () => {
          this.setFollowing(!this.following);
          if (this.following) this.panToSelectedDrone();
        });
        this.followBtn = btn;
        return btn;
      },
    });
    new FollowControl().addTo(this.map);

    // Spawn click: fires only when spawn mode is active
    this.map.on("click", (e: L.LeafletMouseEvent) => {
      if (!this.spawnModeActive) return;
      if (this.onSpawnClick) {
        this.onSpawnClick(e.latlng.lat, e.latlng.lng);
      }
    });
  }

  private createWpIcon(number: number): L.DivIcon {
    const bg = cssVar("--alert-caution-color") || "rgb(233,195,0)";
    const text = cssVar("--on-caution-color") || "#000";
    const ring = cssVar("--container-section-color") || "#121212";
    return L.divIcon({
      className: "",
      html: `<div style="
        width:24px;height:24px;border-radius:50%;
        background:${bg};color:${text};
        font-weight:700;font-size:11px;
        font-family:'Noto Sans',sans-serif;
        display:flex;align-items:center;justify-content:center;
        border:2px solid ${ring};
        box-shadow:0 1px 4px rgba(0,0,0,.55)">${number}</div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  }

  private createDroneIcon(opacity: number, selected: boolean): L.DivIcon {
    const hull = selected
      ? (cssVar("--alert-running-color") || "rgb(0,200,120)")
      : (cssVar("--instrument-enhanced-primary-color") || "rgb(90,132,191)");
    const dark = cssVar("--container-backdrop-color") || "rgb(3,3,3)";
    const borderStyle = selected ? `border: 2px solid ${hull}; border-radius: 50%; padding: 2px;` : "";

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
      <path d="M20,3 L30,14 L28,34 Q20,38 12,34 L10,14 Z"
            fill="${hull}" stroke="${dark}" stroke-width="1.5" stroke-linejoin="round"/>
      <line x1="20" y1="7" x2="20" y2="30"
            stroke="${dark}" stroke-width="1.2" opacity="0.5"/>
      <rect x="15" y="18" width="10" height="8" rx="2"
            fill="${dark}" opacity="0.7"/>
      <polygon points="20,3 17,10 23,10" fill="white" opacity="0.4"/>
    </svg>`;

    const size = selected ? 48 : 40;
    const anchor = size / 2;
    return L.divIcon({
      className: "",
      html: `<div class="drone-icon-inner" style="
        width:${size}px;height:${size}px;opacity:${opacity};
        transform-origin:center;
        transition:opacity 0.3s;${borderStyle}">${svg}</div>`,
      iconSize: [size, size],
      iconAnchor: [anchor, anchor],
    });
  }

  setFollowing(active: boolean): void {
    this.following = active;
    if (this.followBtn) {
      this.followBtn.classList.toggle("active", active);
    }
  }

  private panToSelectedDrone(): void {
    if (!this.selectedDroneId) return;
    const marker = this.droneMarkers.get(this.selectedDroneId);
    if (marker) {
      this.isProgrammaticMove = true;
      this.map.panTo(marker.getLatLng(), { animate: true, duration: 0.3 });
      this.map.once("moveend", () => { this.isProgrammaticMove = false; });
    }
  }

  refreshRoute(): void {
    for (const m of this.wpMarkers) m.remove();
    this.wpMarkers = [];
    if (this.routeLayer) { this.routeLayer.remove(); this.routeLayer = null; }
    if (this.waypoints.length === 0) return;

    const isDraggable = this.drawModeActive;
    for (let i = 0; i < this.waypoints.length; i++) {
      const wp = this.waypoints[i];
      const marker = L.marker([wp.lat, wp.lng], {
        icon: this.createWpIcon(i + 1),
        draggable: isDraggable,
      }).addTo(this.map);

      ((idx: number) => {
        marker.on("dragend", () => {
          const ll = marker.getLatLng();
          this.waypoints[idx] = { lat: ll.lat, lng: ll.lng };
          this.saveCurrentRoute();
          this.refreshRoute();
          this.onWaypointsChanged();
        });
        marker.on("contextmenu", () => {
          this.waypoints.splice(idx, 1);
          this.saveCurrentRoute();
          this.refreshRoute();
          this.onWaypointsChanged();
        });
      })(i);

      this.wpMarkers.push(marker);
    }

    const routeColor = cssVar("--instrument-enhanced-primary-color") || "#5a84bf";
    this.routeLayer = L.polyline(
      this.waypoints.map(w => [w.lat, w.lng] as L.LatLngTuple),
      { color: routeColor, weight: 3, opacity: 0.85 },
    ).addTo(this.map);
  }

  updateWaypointDraggability(): void {
    const isDraggable = this.drawModeActive;
    for (const m of this.wpMarkers) {
      if (isDraggable) m.dragging!.enable();
      else m.dragging!.disable();
    }
  }

  /** Must be set externally — returns current operation mode string */
  getOperationMode: () => string = () => "operated";

  // --- Geofence ---

  private onGeofenceClick = (e: L.LeafletMouseEvent) => {
    if (!this.geofenceModeActive) return;
    this.geofenceVertices.push({ lat: e.latlng.lat, lng: e.latlng.lng });
    this.saveCurrentGeofence();
    this.refreshGeofence();
    this.onGeofenceChanged();
  };

  toggleGeofenceMode(): void {
    this.geofenceModeActive = !this.geofenceModeActive;
    if (this.geofenceModeActive) {
      // Deactivate draw and spawn modes
      if (this.drawModeActive) {
        this.drawModeActive = false;
        this.map.off("click", this.onMapClick);
        this.updateWaypointDraggability();
      }
      this.spawnModeActive = false;
      this.map.on("click", this.onGeofenceClick);
    } else {
      this.map.off("click", this.onGeofenceClick);
    }
    this.refreshGeofence();
  }

  disableGeofenceMode(): void {
    this.geofenceModeActive = false;
    this.map.off("click", this.onGeofenceClick);
  }

  refreshGeofence(): void {
    for (const m of this.geofenceMarkers) m.remove();
    this.geofenceMarkers = [];
    if (this.geofenceLayer) { this.geofenceLayer.remove(); this.geofenceLayer = null; }
    if (this.geofenceVertices.length === 0) return;

    const alarmColor = cssVar("--alert-alarm-color") || "rgb(220,53,69)";
    const isDraggable = this.geofenceModeActive;

    for (let i = 0; i < this.geofenceVertices.length; i++) {
      const v = this.geofenceVertices[i];
      const marker = L.marker([v.lat, v.lng], {
        icon: this.createGeofenceIcon(i + 1),
        draggable: isDraggable,
      }).addTo(this.map);

      ((idx: number) => {
        marker.on("dragend", () => {
          const ll = marker.getLatLng();
          this.geofenceVertices[idx] = { lat: ll.lat, lng: ll.lng };
          this.saveCurrentGeofence();
          this.refreshGeofence();
          this.onGeofenceChanged();
        });
        marker.on("contextmenu", () => {
          this.geofenceVertices.splice(idx, 1);
          this.saveCurrentGeofence();
          this.refreshGeofence();
          this.onGeofenceChanged();
        });
      })(i);

      this.geofenceMarkers.push(marker);
    }

    if (this.geofenceVertices.length >= 3) {
      this.geofenceLayer = L.polygon(
        this.geofenceVertices.map(v => [v.lat, v.lng] as L.LatLngTuple),
        {
          color: alarmColor,
          weight: 2,
          dashArray: "6, 4",
          fillColor: alarmColor,
          fillOpacity: 0.08,
        },
      ).addTo(this.map);
    }
  }

  private createGeofenceIcon(number: number): L.DivIcon {
    const bg = cssVar("--alert-alarm-color") || "rgb(220,53,69)";
    const text = "#fff";
    const ring = cssVar("--container-section-color") || "#121212";
    return L.divIcon({
      className: "",
      html: `<div style="
        width:20px;height:20px;border-radius:50%;
        background:${bg};color:${text};
        font-weight:700;font-size:9px;
        font-family:'Noto Sans',sans-serif;
        display:flex;align-items:center;justify-content:center;
        border:2px solid ${ring};
        box-shadow:0 1px 4px rgba(0,0,0,.55)">${number}</div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  }

  clearGeofence(): void {
    this.geofenceVertices = [];
    if (this.selectedDroneId) {
      this.droneGeofences.set(this.selectedDroneId, []);
    }
    for (const m of this.geofenceMarkers) m.remove();
    this.geofenceMarkers = [];
    if (this.geofenceLayer) { this.geofenceLayer.remove(); this.geofenceLayer = null; }
  }

  setGeofenceBreached(breached: boolean): void {
    if (!this.geofenceLayer) return;
    const alarmColor = cssVar("--alert-alarm-color") || "rgb(220,53,69)";
    if (breached) {
      this.geofenceLayer.setStyle({
        dashArray: undefined,
        weight: 3,
        fillOpacity: 0.18,
        color: alarmColor,
        fillColor: alarmColor,
      });
    } else {
      this.geofenceLayer.setStyle({
        dashArray: "6, 4",
        weight: 2,
        fillOpacity: 0.08,
        color: alarmColor,
        fillColor: alarmColor,
      });
    }
  }

  private saveCurrentGeofence(): void {
    if (this.selectedDroneId) {
      this.droneGeofences.set(this.selectedDroneId, [...this.geofenceVertices]);
    }
  }

  /** Sync current waypoints into the per-drone store */
  private saveCurrentRoute(): void {
    if (this.selectedDroneId) {
      this.droneRoutes.set(this.selectedDroneId, [...this.waypoints]);
    }
  }

  private onMapClick = (e: L.LeafletMouseEvent) => {
    if (!this.drawModeActive) return;
    this.waypoints.push({ lat: e.latlng.lat, lng: e.latlng.lng });
    this.saveCurrentRoute();
    this.refreshRoute();
    this.onWaypointsChanged();
  };

  toggleSpawnMode(): void {
    this.spawnModeActive = !this.spawnModeActive;
    // Deactivate draw mode when entering spawn mode
    if (this.spawnModeActive && this.drawModeActive) {
      this.drawModeActive = false;
      this.map.off("click", this.onMapClick);
      this.updateWaypointDraggability();
    }
  }

  toggleDrawMode(): void {
    this.drawModeActive = !this.drawModeActive;
    if (this.drawModeActive) {
      // Deactivate spawn mode when entering draw mode
      this.spawnModeActive = false;
      this.map.on("click", this.onMapClick);
    } else {
      this.map.off("click", this.onMapClick);
    }
    this.updateWaypointDraggability();
  }

  disableDrawMode(): void {
    this.drawModeActive = false;
    this.map.off("click", this.onMapClick);
  }

  updateDronePosition(entityId: string, lat: number, lng: number, heading: number, operationMode: string): void {
    // Ignore frames near null island (0, 0) — backend race on spawn adds noise
    if (Math.abs(lat) < 0.01 && Math.abs(lng) < 0.01) return;

    const latlng = L.latLng(lat, lng);
    const opacity = 1.0;
    const isSelected = entityId === this.selectedDroneId;
    const prevMode = this.droneStates.get(entityId);
    this.droneStates.set(entityId, operationMode);

    let marker = this.droneMarkers.get(entityId);
    if (!marker) {
      marker = L.marker(latlng, {
        icon: this.createDroneIcon(opacity, isSelected),
        zIndexOffset: isSelected ? 1000 : 500,
        draggable: operationMode === "operated",
      }).addTo(this.map);
      marker.on("click", () => {
        if (this.onDroneSelected) this.onDroneSelected(entityId);
      });
      marker.on("dragstart", () => {
        // Freeze position updates while dragging and for 1s after
        this.droneFrozenUntil.set(entityId, Infinity);
      });
      marker.on("dragend", () => {
        // Keep frozen for 1s so backend frames don't snap it back
        this.droneFrozenUntil.set(entityId, Date.now() + 1000);
        const pos = marker!.getLatLng();
        if (this.onDroneDragged) this.onDroneDragged(entityId, pos.lat, pos.lng);
      });
      this.droneMarkers.set(entityId, marker);
    }

    // Don't override position while frozen (during/after drag)
    const frozenUntil = this.droneFrozenUntil.get(entityId) ?? 0;
    if (Date.now() >= frozenUntil) {
      marker.setLatLng(latlng);
      this.droneFrozenUntil.delete(entityId);
    }
    this.droneOpacities.set(entityId, opacity);

    // Update draggability when operation mode changes
    if (prevMode !== operationMode) {
      if (operationMode === "operated") {
        marker.dragging!.enable();
      } else {
        marker.dragging!.disable();
      }
    }

    // Pan to follow the selected drone when following is enabled
    if (isSelected && this.following && !this.isZooming) {
      this.isProgrammaticMove = true;
      this.map.panTo(latlng, { animate: true, duration: 0.1 });
      this.map.once("moveend", () => { this.isProgrammaticMove = false; });
    }

    // Heading rotation
    const el = marker.getElement();
    const inner = el && el.querySelector(".drone-icon-inner") as HTMLElement | null;
    if (inner) {
      inner.style.transform = `rotate(${heading}deg)`;
      inner.style.opacity = String(opacity);
    }
  }

  selectDrone(entityId: string): void {
    const prevId = this.selectedDroneId;

    // Save current waypoints and geofence for the previous drone
    if (prevId) {
      this.droneRoutes.set(prevId, [...this.waypoints]);
      this.droneGeofences.set(prevId, [...this.geofenceVertices]);
    }

    this.selectedDroneId = entityId;

    // Load waypoints for the newly selected drone
    this.waypoints = [...(this.droneRoutes.get(entityId) ?? [])];
    this.refreshRoute();
    this.onWaypointsChanged();

    // Load geofence for the newly selected drone
    this.geofenceVertices = [...(this.droneGeofences.get(entityId) ?? [])];
    this.refreshGeofence();
    this.onGeofenceChanged();

    // Refresh icons for old and new selection
    if (prevId && prevId !== entityId) {
      this.refreshMarkerIcon(prevId);
    }
    this.refreshMarkerIcon(entityId);

    // Enable following and pan to the newly selected drone
    this.setFollowing(true);
    const marker = this.droneMarkers.get(entityId);
    if (marker) {
      this.isProgrammaticMove = true;
      this.map.panTo(marker.getLatLng(), { animate: true, duration: 0.3 });
      this.map.once("moveend", () => { this.isProgrammaticMove = false; });
    }
  }

  private refreshMarkerIcon(entityId: string): void {
    const marker = this.droneMarkers.get(entityId);
    if (!marker) return;
    const opacity = this.droneOpacities.get(entityId) ?? 0.4;
    const isSelected = entityId === this.selectedDroneId;
    marker.setIcon(this.createDroneIcon(opacity, isSelected));
    marker.setZIndexOffset(isSelected ? 1000 : 500);
  }

  removeDrone(entityId: string): void {
    const marker = this.droneMarkers.get(entityId);
    if (marker) {
      marker.remove();
      this.droneMarkers.delete(entityId);
      this.droneOpacities.delete(entityId);
    }
  }

  /** Refresh all drone icons (e.g. after theme change) */
  refreshDroneIcon(): void {
    for (const [entityId] of this.droneMarkers) {
      this.refreshMarkerIcon(entityId);
    }
  }

  clearWaypoints(): void {
    this.waypoints = [];
    if (this.selectedDroneId) {
      this.droneRoutes.set(this.selectedDroneId, []);
    }
    for (const m of this.wpMarkers) m.remove();
    this.wpMarkers = [];
    if (this.routeLayer) { this.routeLayer.remove(); this.routeLayer = null; }
  }
}
