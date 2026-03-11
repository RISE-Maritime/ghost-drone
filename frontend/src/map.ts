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
  private droneMarker: L.Marker;
  private isZooming = false;
  private lastOpacity = 0.4;
  drawModeActive = false;

  /** External callback for control state refresh */
  onWaypointsChanged: () => void = () => {};

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

    this.droneMarker = L.marker([57.7069, 11.9381], {
      icon: this.createDroneIcon(0.4),
      zIndexOffset: 1000,
    }).addTo(this.map);

    this.map.on("zoomstart", () => { this.isZooming = true; });
    this.map.on("zoomend", () => { this.isZooming = false; });
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

  private createDroneIcon(opacity?: number): L.DivIcon {
    if (opacity === undefined) opacity = 1.0;
    this.lastOpacity = opacity;
    const hull = cssVar("--instrument-enhanced-primary-color") || "rgb(90,132,191)";
    const dark = cssVar("--container-backdrop-color") || "rgb(3,3,3)";

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
      <path d="M20,3 L30,14 L28,34 Q20,38 12,34 L10,14 Z"
            fill="${hull}" stroke="${dark}" stroke-width="1.5" stroke-linejoin="round"/>
      <line x1="20" y1="7" x2="20" y2="30"
            stroke="${dark}" stroke-width="1.2" opacity="0.5"/>
      <rect x="15" y="18" width="10" height="8" rx="2"
            fill="${dark}" opacity="0.7"/>
      <polygon points="20,3 17,10 23,10" fill="white" opacity="0.4"/>
    </svg>`;

    return L.divIcon({
      className: "",
      html: `<div id="drone-icon-inner" style="
        width:40px;height:40px;opacity:${opacity};
        transform-origin:center;
        transition:opacity 0.3s">${svg}</div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
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

  updateDronePosition(lat: number, lng: number, heading: number, state: string): void {
    const latlng = L.latLng(lat, lng);
    this.droneMarker.setLatLng(latlng);

    if (state === "playing" && !this.isZooming) {
      this.map.panTo(latlng, { animate: true, duration: 0.1 });
    }

    // Heading rotation
    const el = this.droneMarker.getElement();
    const inner = el && el.querySelector("#drone-icon-inner") as HTMLElement | null;
    if (inner) inner.style.transform = `rotate(${heading}deg)`;

    // Opacity
    const opacity = state === "playing" ? 1.0 : 0.4;
    if (inner) {
      inner.style.opacity = String(opacity);
      this.lastOpacity = opacity;
    }
  }

  /** Refresh drone icon (e.g. after theme change) */
  refreshDroneIcon(): void {
    this.droneMarker.setIcon(this.createDroneIcon(this.lastOpacity));
  }

  clearWaypoints(): void {
    this.waypoints = [];
    for (const m of this.wpMarkers) m.remove();
    this.wpMarkers = [];
    if (this.routeLayer) { this.routeLayer.remove(); this.routeLayer = null; }
  }
}
