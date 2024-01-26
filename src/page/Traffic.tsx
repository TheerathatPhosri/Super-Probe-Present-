import React, { useEffect, useState } from 'react';

interface Location {
  name: string;
  coords: { lat: number; lng: number };
  type: string;
  icon: string;
  photo?: string;
}

const Traffic = () => {
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCyVjUgkD3C3rfbXdhrG7T8TsFH-BBS6a0&callback=initMap`;
    script.defer = true;
    script.async = true;

    script.onload = () => {
      initMap();
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Function to get icon based on type
  const getIconForType = (type: string): string => {
    // Implement your logic to map types to icon URLs
    switch (type) {
      case 'ห้องน้ำ':
        return 'https://ud.traffy.in.th/img/icon-marker/%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B9%89%E0%B8%B3_%E0%B8%A7%E0%B8%87%E0%B8%81%E0%B8%A5%E0%B8%A1.png'; // Replace with the actual URL of the bathroom icon
      case 'ทางลาด':
        return 'https://ud.traffy.in.th/img/icon-marker/%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%A5%E0%B8%B2%E0%B8%94_%E0%B8%A7%E0%B8%87%E0%B8%81%E0%B8%A5%E0%B8%A1.png'; // Replace with the actual URL of the stairs icon
      case 'ทางเดิน':
        return 'https://ud.traffy.in.th/img/icon-marker/%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B9%80%E0%B8%94%E0%B8%B4%E0%B8%99_%E0%B8%A7%E0%B8%87%E0%B8%81%E0%B8%A5%E0%B8%A1.png'; // Replace with the actual URL of the walkway icon
      case 'ป้ายสัญลักษณ์':
        return '/public/Image/road-sign-5691107_960_720.webp'; // Replace with the actual URL of the sign icon
      case 'ที่จอดรถ':
        return 'https://ud.traffy.in.th/img/icon-marker/%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%88%E0%B8%AD%E0%B8%94%E0%B8%A3%E0%B8%96_%E0%B8%A7%E0%B8%87%E0%B8%81%E0%B8%A5%E0%B8%A1.png'; // Replace with the actual URL of the parking icon
      case 'ลิฟต์':
        return 'https://ud.traffy.in.th/img/icon-marker/%E0%B8%A5%E0%B8%B4%E0%B8%9F%E0%B8%97%E0%B9%8C_%E0%B8%A7%E0%B8%87%E0%B8%81%E0%B8%A5%E0%B8%A1.png'; // Replace with the actual URL of the parking icon
      case 'ศูนย์บริการ':
        return 'https://ud.traffy.in.th/img/icon-marker/%E0%B8%AD%E0%B8%B7%E0%B9%88%E0%B8%99%E0%B9%86_%E0%B8%81%E0%B8%A5%E0%B8%A1.png'; // Replace with the actual URL of the parking icon
      default:
        return 'url/to/default-icon.png'; // Replace with the actual URL of the default icon
    }
  };

  // Function to get info window content
  const getInfoWindowContent = (location: Location): string => {
    return `
      <div>
        <strong>${location.name}</strong>
        <br />
        <img src="${location.photo}" alt="${location.name}" style="max-width: 100%; max-height: 150px;" />
      </div>
    `;
  };

  const initMap = async () => {
    const mapElement = document.getElementById('map');

    if (mapElement) {
      const map = new window.google.maps.Map(mapElement, {
        center: { lat: 13.7563, lng: 100.5018 },
        zoom: 6,
      });

      try {
        const response = await fetch('https://publicapi.traffy.in.th/ud/search?type=&offset=5');
        const data = await response.json();

        const locations: Location[] = data.results.map((result: any) => ({
          name: result.name,
          org: result.org,
          coords: { lat: result.coords[1], lng: result.coords[0] },
          type: result.type,
          icon: getIconForType(result.type),
          photo: result.photo,
        }));

        const windows: google.maps.InfoWindow[] = [];

        locations.forEach((location: Location) => {
          const marker = new window.google.maps.Marker({
            position: location.coords,
            map,
            title: location.name,
            icon: {
              url: location.icon,
              scaledSize: new window.google.maps.Size(30, 30),
            },
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div>
                รายละเอียดสถานที่: ${location.name}<br/>
                <img src="${location.photo}" alt="Location Photo" style="max-width: 150px; height: auto;"/>
              </div>
            `,
          });

          windows.push(infoWindow);

          marker.addListener('click', () => {
            windows.forEach((w) => w.close()); // Close other open info windows
            infoWindow.open(map, marker);
          });
        });

        // Set the info windows to state for future updates
        setInfoWindows(windows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  return (
    <div className='mt-10'>
      <div id='map' style={{ height: '600px', width: '100%' }}></div>
      <br />
    </div>
  );
};

export default Traffic;
