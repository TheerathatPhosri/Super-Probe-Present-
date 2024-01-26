import React, { useEffect, useState } from 'react';
import DetailsPM from '../components/DetailsPM';

interface Station {
  dustboy_lat: number | string;
  dustboy_lng: number | string;
  dustboy_pv: number;
  dustboy_name_th: string;
}

const Map = () => {
  const [items, setItems] = useState<Station[]>([]);
  const [searchProvince, setSearchProvince] = useState<string>('');

  useEffect(() => {
    fetch('https://www.cmuccdc.org/api/ccdc/stations')
      .then((res) => res.json())
      .then((result) => {
        const stationsWithNumbers = result.map((station: Station) => ({
          ...station,
          dustboy_lat: parseFloat(station.dustboy_lat as string) || 0,
          dustboy_lng: parseFloat(station.dustboy_lng as string) || 0,
        }));

        setItems(stationsWithNumbers);
      });
  }, []);

  useEffect(() => {
    const initMap = () => {
      const mapElement = document.getElementById('map');
      if (mapElement) {
        const map = new window.google.maps.Map(mapElement, {
          center: { lat: 13.7563, lng: 100.5018 },
          zoom: 6,
        });

        // If a province is searched, zoom to its location
        if (searchProvince) {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode(
            { address: searchProvince + ', Thailand' },
            (results, status) => {
              if (status === 'OK' && results[0].geometry) {
                const location = results[0].geometry.location;
                map.setCenter(location);
                map.setZoom(8);
              } else {
                console.error('Geocode was not successful for the following reason:', status);
              }
            }
          );
        }

        items.forEach((item) => {
          let circleColor = '#FFFFFF';

          if (item.dustboy_pv >= 0 && item.dustboy_pv <= 15.0) {
            circleColor = '#0000FF';
          } else if (item.dustboy_pv <= 25.0) {
            circleColor = '#00FF00';
          } else if (item.dustboy_pv <= 37.5) {
            circleColor = '#FFFF00';
          } else if (item.dustboy_pv <= 75.0) {
            circleColor = '#FFA500';
          } else {
            circleColor = '#FF0000';
          }

          const circle = new window.google.maps.Circle({
            strokeColor: circleColor,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: circleColor,
            fillOpacity: 0.35,
            map: map,
            center: { lat: parseFloat(item.dustboy_lat as string), lng: parseFloat(item.dustboy_lng as string) },
            radius: 15000,
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `สถานี: ${item.dustboy_name_th}, Dust PV: ${item.dustboy_pv}`,
          });

          window.google.maps.event.addListener(circle, 'click', (event) => {
            infoWindow.setPosition(circle.getCenter());
            infoWindow.open(map);
          });
        });
      }
    };

    (window as any).initMap = initMap;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCyVjUgkD3C3rfbXdhrG7T8TsFH-BBS6a0&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [items, searchProvince]);

  const handleSearch = () => {
    // Trigger the map update when the search button is clicked
    (window as any).initMap();
  };

  return (
    <>
      <div className='mt-10'>
        <input
          type='text'
          value={searchProvince}
          onChange={(e) => setSearchProvince(e.target.value)}
          placeholder='Enter province name'
        />
        <button onClick={handleSearch}>Search</button>
        <div id='map' style={{ height: '600px', width: '100%' }}></div>
        <br />
        <DetailsPM />
      </div>
    </>
  );
};

export default Map;
