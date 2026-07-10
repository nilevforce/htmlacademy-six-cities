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
import { useMap } from '../../hooks';
import classNames from 'classnames';

interface MapProps {
  className?: string;
  city: City;
  points: MapPoint[];
  selectedPoint: {
    title: string;
    latitude: number;
    longitude: number;
  } | null;
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

const isSamePoint = (
  a: { latitude: number; longitude: number },
  b: { latitude: number; longitude: number }
): boolean => a.latitude === b.latitude && a.longitude === b.longitude;

function MapComponent (props: MapProps): ReactElement {
  const {
    city,
    points,
    selectedPoint
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
      const key = `${point.latitude}_${point.longitude}`;
      const isSelected = selectedPoint && isSamePoint({
        longitude: point.longitude,
        latitude: point.latitude
      }, {
        longitude: selectedPoint.longitude,
        latitude: selectedPoint.latitude
      });

      const marker = leaflet
        .marker(
          { lat: point.latitude, lng: point.longitude },
          {
            title: point.title,
            icon: isSelected ? currentCustomIcon : defaultCustomIcon,
          }
        )
        .bindTooltip(point.title)
        .addTo(map);

      markers.set(key, marker);
    });

    markersRef.current = markers;

    return () => {
      markers.forEach((marker) => marker.remove());
      markersRef.current = new Map();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);

  useEffect(() => {
    points.forEach((point) => {
      const key = `${point.latitude}_${point.longitude}`;
      const marker = markersRef.current.get(key);
      const isSelected = selectedPoint && isSamePoint({
        longitude: point.longitude,
        latitude: point.latitude
      }, {
        longitude: selectedPoint.longitude,
        latitude: selectedPoint.latitude
      });

      if (!marker) {
        return;
      }

      marker.setIcon(isSelected ? currentCustomIcon : defaultCustomIcon);
    });
  }, [selectedPoint, points]);

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
