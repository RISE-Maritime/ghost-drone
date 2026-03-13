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
  private wpMarkers: L.Marker[] = [];
  private routeLayer: L.Polyline | null = null;
  private droneMarkers: Map<string, L.Marker> = new Map();
  private droneOpacities: Map<string, number> = new Map();
  private isZooming = false;
  drawModeActive = false;
  selectedDroneId: string | null = null;

  /** External callback for control state refresh */
  onWaypointsChanged: () => void = () => {};

  /** External callback for spawn-on-click */
  onSpawnClick: ((lat: number, lng: number) => void) | null = null;

  /** External callback when a drone marker is clicked to select it */
  onDroneSelected: ((entityId: string) => void) | null = null;

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

    // Spawn click: fires when not in draw mode
    this.map.on("click", (e: L.LeafletMouseEvent) => {
      if (this.drawModeActive) return;
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

  refreshRoute(): void {
    for (const m of this.wpMarkers) m.remove();
    this.wpMarkers = [];
    if (this.routeLayer) { this.routeLayer.remove(); this.routeLayer = null; }
    if (this.waypoints.length === 0) return;

    const isDraggable = this.drawModeActive && this.getSimState() === "stopped";
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
          this.refreshRoute();
          this.onWaypointsChanged();
        });
        marker.on("contextmenu", () => {
          this.waypoints.splice(idx, 1);
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
    const isDraggable = this.drawModeActive && this.getSimState() === "stopped";
    for (const m of this.wpMarkers) {
      if (isDraggable) m.dragging!.enable();
      else m.dragging!.disable();
    }
  }

  /** Must be set externally — returns current sim state string */
  getSimState: () => string = () => "stopped";

  private onMapClick = (e: L.LeafletMouseEvent) => {
    if (!this.drawModeActive || this.getSimState() !== "stopped") return;
    this.waypoints.push({ lat: e.latlng.lat, lng: e.latlng.lng });
    this.refreshRoute();
    this.onWaypointsChanged();
  };

  toggleDrawMode(): void {
    if (this.getSimState() !== "stopped") return;
    this.drawModeActive = !this.drawModeActive;
    if (this.drawModeActive) this.map.on("click", this.onMapClick);
    else this.map.off("click", this.onMapClick);
    this.updateWaypointDraggability();
  }

  disableDrawMode(): void {
    this.drawModeActive = false;
    this.map.off("click", this.onMapClick);
  }

  updateDronePosition(entityId: string, lat: number, lng: number, heading: number, state: string): void {
    const latlng = L.latLng(lat, lng);
    const opacity = state === "playing" ? 1.0 : 0.4;
    const isSelected = entityId === this.selectedDroneId;

    let marker = this.droneMarkers.get(entityId);
    if (!marker) {
      marker = L.marker(latlng, {
        icon: this.createDroneIcon(opacity, isSelected),
        zIndexOffset: isSelected ? 1000 : 500,
      }).addTo(this.map);
      marker.on("click", () => {
        if (this.onDroneSelected) this.onDroneSelected(entityId);
      });
      this.droneMarkers.set(entityId, marker);
    }

    marker.setLatLng(latlng);
    this.droneOpacities.set(entityId, opacity);

    // Only pan to follow the selected drone
    if (isSelected && state === "playing" && !this.isZooming) {
      this.map.panTo(latlng, { animate: true, duration: 0.1 });
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
    this.selectedDroneId = entityId;

    // Refresh icons for old and new selection
    if (prevId && prevId !== entityId) {
      this.refreshMarkerIcon(prevId);
    }
    this.refreshMarkerIcon(entityId);

    // Pan to the newly selected drone
    const marker = this.droneMarkers.get(entityId);
    if (marker) {
      this.map.panTo(marker.getLatLng(), { animate: true, duration: 0.3 });
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
    for (const m of this.wpMarkers) m.remove();
    this.wpMarkers = [];
    if (this.routeLayer) { this.routeLayer.remove(); this.routeLayer = null; }
  }
}
