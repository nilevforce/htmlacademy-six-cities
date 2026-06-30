import {
  MutableRefObject,
  ReactElement,
  useEffect,
  useRef,
} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City } from '../../types/city.ts';
import { MapPoint } from '../../types/map-points.ts';
import useMap from '../../hooks/use-map.ts';
import classNames from 'classnames';

interface MapProps {
  className?: string;
  city: City;
  points: MapPoint[];
  selectedPointTitle: string | null;
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function MapComponent (props: MapProps): ReactElement {
  const {
    city,
    points,
    selectedPointTitle
  } = props;

  const mapRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const instanceMapRef = useMap({ mapRef, city });

  const markersRef = useRef<Map<string, leaflet.Marker>>(new Map());

  useEffect(() => {
    const map = instanceMapRef.current;
    if (!map) {
      return;
    }

    const markers = new Map<string, leaflet.Marker>();

    points.forEach((point) => {
      const marker = leaflet
        .marker(
          { lat: point.latitude, lng: point.longitude },
          { title: point.title, icon: defaultCustomIcon }
        )
        .bindTooltip(point.title)
        .addTo(map);

      markers.set(point.title, marker);
    });

    markersRef.current = markers;

    return () => {
      markers.forEach((marker) => marker.remove());
      markersRef.current = new Map();
    };
  }, [points]);

  useEffect(() => {
    markersRef.current.forEach((marker, title) => {
      marker.setIcon(title === selectedPointTitle ? currentCustomIcon : defaultCustomIcon);
    });
  }, [selectedPointTitle]);

  return (
    <section
      className={
        classNames(
          props.className,
          'map'
        )
      }
      style={{ minHeight: '500px', height: '100%' }}
      ref={mapRef}
    >
    </section>
  );
}

export default MapComponent;
