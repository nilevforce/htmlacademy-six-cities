import {
  MutableRefObject,
  useEffect,
  useRef
} from 'react';
import leaflet from 'leaflet';
import { City } from '../types/city.ts';

interface UseMapProps {
  mapRef: MutableRefObject<HTMLElement | null>;
  city: City;
}

function useMap ({ mapRef, city }: UseMapProps) {
  const mapInstanceRef = useRef<leaflet.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const instance = leaflet.map(mapRef.current, {
      center: {
        lat: city.location.latitude,
        lng: city.location.longitude
      },
      zoom: city.location.zoom,
      dragging: false,
      touchZoom: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false
    });

    leaflet
      .tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      )
      .addTo(instance);

    mapInstanceRef.current = instance;

    const handleMapClick = () => {
      instance.dragging.enable();
      instance.touchZoom.enable();
      instance.scrollWheelZoom.enable();
      instance.doubleClickZoom.enable();
      instance.boxZoom.enable();
    };

    const handleMouseLeave = () => {
      instance.dragging.disable();
      instance.touchZoom.disable();
      instance.scrollWheelZoom.disable();
      instance.doubleClickZoom.disable();
      instance.boxZoom.disable();
    };

    instance.addEventListener('click', handleMapClick);
    instance.addEventListener('mouseout', handleMouseLeave);

    return () => {
      instance.remove();
      instance.removeEventListener('click', handleMapClick);
      instance.removeEventListener('mouseout', handleMouseLeave);
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    mapInstanceRef.current?.setView(
      [city.location.latitude, city.location.longitude],
      city.location.zoom
    );
  }, [city]);

  return mapInstanceRef;
}

export default useMap;
