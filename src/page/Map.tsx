import { useEffect, useState } from 'react';
import DetailsPM from '../components/DetailsPM';
import ReactDOM from 'react-dom';
interface Station {
  dustboy_lat: number | string;
  dustboy_lng: number | string;
  dustboy_pv: number;
  dustboy_name_th: string;
  // ... other properties
}


const Map = () => {
  const [items, setItems] = useState<Station[]>([]);


  useEffect(() => {
    fetch('https://www.cmuccdc.org/api/ccdc/stations')
      .then((res) => res.json())
      .then((result) => {
        // แปลงค่า "dustboy_lat" และ "dustboy_lng" จาก string เป็น number
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
        const googleMap = new window.google.maps.Map(mapElement, {
          center: { lat: 13.7563, lng: 100.5018 },
          zoom: 6,
        });

        items.forEach((item) => {
          let circleColor = '#FFFFFF'; // สีขอบวงกลมเริ่มต้น

          if (item.dustboy_pv >= 0 && item.dustboy_pv <= 15.0) {
            circleColor = '#0000FF'; // สีฟ้า
          } else if (item.dustboy_pv <= 25.0) {
            circleColor = '#00FF00'; // สีเขียว
          } else if (item.dustboy_pv <= 37.5) {
            circleColor = '#FFFF00'; // สีเหลือง
          } else if (item.dustboy_pv <= 75.0) {
            circleColor = '#FFA500'; // สีส้ม
          } else {
            circleColor = '#FF0000'; // สีแดง
          }

          const circle = new window.google.maps.Circle({
            strokeColor: circleColor,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: circleColor,
            fillOpacity: 0.35,
            map: googleMap,
            center: { lat: parseFloat(item.dustboy_lat as string), lng: parseFloat(item.dustboy_lng as string) },

            radius: 15000,
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `สถานี: ${item.dustboy_name_th}, Dust PV: ${item.dustboy_pv}`,
          });

          window.google.maps.event.addListener(circle, 'click', (event) => {
            infoWindow.setPosition(circle.getCenter());
            infoWindow.open(googleMap);
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
  }, [items]);

  return (
    <div className='mt-10'>
      <div id="map" style={{ height: '600px', width: '100%' }}></div>
      <br />
      <DetailsPM />
    </div>
  );

};

export default Map;
