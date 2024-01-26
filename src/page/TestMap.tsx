import React, { useEffect, useState } from 'react';

interface Hotel {
  name: string;
  name_en: string;
  latitude: number;
  longitude: number;
  description: string;
  description_en: string;
}

interface DustboyStation {
  dustboy_lat: number;
  dustboy_lng: number;
  dustboy_pv: string;
  dustboy_name_th: string;
}

const TestMap = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [dustboyStations, setDustboyStations] = useState<DustboyStation[]>([]);
  const [searchProvince, setSearchProvince] = useState<string>('');

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await fetch('/public/Data/hotel.json');
        const result = await response.json();

        // Assuming the structure of the data
        const hotelsData: Hotel[] = Array.isArray(result) ? result : [result];
        setHotels(hotelsData);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };

    const fetchDustboyData = async () => {
      try {
        const response = await fetch('https://www.cmuccdc.org/api/ccdc/stations');
        const result = await response.json();

        // Assuming the structure of the data
        const dustboyData: DustboyStation[] = Array.isArray(result) ? result : [result];
        setDustboyStations(dustboyData);
      } catch (error) {
        console.error('Error fetching dustboy data:', error);
      }
    };

    fetchHotelData();
    fetchDustboyData();
  }, []);

  useEffect(() => {
    const initMap = () => {
      let map: google.maps.Map<Element> | null = null;
      let infoWindow: google.maps.InfoWindow | null = null;

      const mapElement = document.getElementById('map');
      if (mapElement) {
        map = new window.google.maps.Map(mapElement, {
          center: { lat: 13.7563, lng: 100.5018 },
          zoom: 6,
        });

        if (searchProvince) {
          // ... (unchanged code for searching province and drawing a circle)
        }

        hotels.forEach((hotel) => {
          const customMarkerIcon = 'https://cdn-icons-png.flaticon.com/512/9922/9922103.png';

          const marker = new window.google.maps.Marker({
            position: { lat: hotel.latitude, lng: hotel.longitude },
            map: map!,
            title: hotel.name,
            icon: {
              url: customMarkerIcon,
              scaledSize: new window.google.maps.Size(40, 40),
            },
          });

          marker.addListener('click', () => {
            if (infoWindow) {
              infoWindow.close();
            }

            // Find the nearest Dustboy station based on proximity
            const nearestDustboyStation = findNearestDustboyStation(
              { latitude: hotel.latitude, longitude: hotel.longitude },
              dustboyStations
            );

            // Display the hotel and Dustboy information in the InfoWindow
            infoWindow = new window.google.maps.InfoWindow({
              content: `<div>${hotel.name}</div>
                        <div>${hotel.description}</div>
                        <div>${hotel.description_en}</div><br>
                        <div><strong>ค่าฝุ่น PM:</strong> ${nearestDustboyStation?.dustboy_pv}</div>
                        <div><strong>อุณหภูมิ :</strong></div>`,
            });

            infoWindow.open(map!, marker);
          });
        });

        dustboyStations.forEach((station) => {
          const marker = new window.google.maps.Marker({
            position: { lat: station.dustboy_lat, lng: station.dustboy_lng },
            map: map!,
            title: station.dustboy_name_th,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: getMarkerColor(station.dustboy_pv),
              fillOpacity: 0.8,
              strokeColor: 'white',
              strokeWeight: 1,
              scale: 10,
            },
          });

          marker.addListener('click', () => {
            if (infoWindow) {
              infoWindow.close();
            }

            infoWindow = new window.google.maps.InfoWindow({
              content: `<div>${station.dustboy_name_th}</div><br>
                        <div>PM2.5: ${station.dustboy_pv}</div>`,
            });

            infoWindow.open(map!, marker);
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
  }, [hotels, dustboyStations, searchProvince]);

  const handleSearch = () => {
    (window as any).initMap();
  };

  // Helper function to find the nearest Dustboy station based on proximity
  const findNearestDustboyStation = (
    hotelLocation: { latitude: number; longitude: number },
    dustboyStations: DustboyStation[]
  ): DustboyStation | undefined => {
    let nearestStation: DustboyStation | undefined;
    let minDistance: number | null = null;

    dustboyStations.forEach((station) => {
      const distance = getDistanceBetweenPoints(
        hotelLocation.latitude,
        hotelLocation.longitude,
        station.dustboy_lat,
        station.dustboy_lng
      );

      if (minDistance === null || distance < minDistance) {
        minDistance = distance;
        nearestStation = station;
      }
    });

    return nearestStation;
  };

  // Helper function to calculate the distance between two points
  const getDistanceBetweenPoints = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI / 180);
  };

  // Helper function to get marker color based on dustboy_pv value
  const getMarkerColor = (dustboyPv: string): string => {
    const pvValue = parseFloat(dustboyPv);
    if (pvValue < 5) {
      return 'green';
    } else if (pvValue < 10) {
      return 'yellow';
    } else {
      return 'red';
    }
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
      </div>
    </>
  );
};

export default TestMap;
