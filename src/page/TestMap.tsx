import React, { useEffect, useState } from 'react';
import DetailsPM from '../components/DetailsPM';

interface Amphoe {
  name: string;
  Latitude: number;
  Longitude: number;
  PM25: string;
  temp: string;
  humid: string;
  wind: string;
  noise: string;
  traffic: string;
}

const TestMap = () => {
  const [items, setItems] = useState<Amphoe[]>([]);
  const [selectedAmphoe, setSelectedAmphoe] = useState<Amphoe | null>(null);
  // ตัวอย่างการประกาศ state สำหรับ searchLat และ searchLng
const [searchLat, setSearchLat] = useState<string>('');
const [searchLng, setSearchLng] = useState<string>('');


  useEffect(() => {
    // Load Google Maps API script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCyVjUgkD3C3rfbXdhrG7T8TsFH-BBS6a0`;
    script.async = true;
    script.defer = true;
    script.onload = fetchDataAndInitializeMap;
    document.head.appendChild(script);
  }, []); // Empty dependency array ensures this useEffect runs once on component mount

  const fetchDataAndInitializeMap = () => {
    // Fetch data and set items
    fetch('/public/Data/DataProbe2.json')
      .then((res) => res.json())
      .then((result) => {
        if (Array.isArray(result)) {
          const amphoes = result.map((amphoe: Amphoe) => ({
            ...amphoe,
            Latitude: amphoe.Latitude !== undefined ? parseFloat(amphoe.Latitude as unknown as string) || 0 : 0,
            Longitude: amphoe.Longitude !== undefined ? parseFloat(amphoe.Longitude as unknown as string) || 0 : 0,
          }));

          setItems(amphoes);

          // Initialize the map after fetching data
          initializeMap(amphoes);
        } else {
          console.error('Data is not an array:', result);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const initializeMap = (amphoes: Amphoe[]) => {
    const mapElement = document.getElementById('map');
    if (mapElement && window.google && window.google.maps) {
      const map = new window.google.maps.Map(mapElement, {
        center: { lat: 13.7563, lng: 100.5018 },
        zoom: 6,
      });

      amphoes.forEach((amphoe) => {
        let circleColor = '#FFFFFF';

        const pm25Value = parseFloat(amphoe.PM25);

        if (!isNaN(pm25Value)) {
          if (pm25Value >= 70 && pm25Value <= 80) {
            circleColor = '#FFA500'; // Orange color
          } else if (pm25Value > 80) {
            circleColor = '#FF0000'; // Red color
          }else{
            circleColor = 'green';
          }
        }

        const circle = new window.google.maps.Circle({
          strokeColor: circleColor,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: circleColor,
          fillOpacity: 0.35,
          map: map,
          center: { lat: amphoe.Latitude, lng: amphoe.Longitude },
          radius: 15000,
        });

        window.google.maps.event.addListener(circle, 'click', (event) => {
          const infoWindowContent = `
                                <div>Lat: ${amphoe.Latitude} Long: ${amphoe.Longitude}</div>
                                <div>อำเภอ: ${amphoe.name}</div>
                               <div>PM2.5: ${amphoe.PM25}</div>
                               <div>อุณหภูมิ: ${amphoe.temp}</div>
                               <div>ความชื้น: ${amphoe.humid}</div>
                               <div>แรงลม: ${amphoe.wind}</div>
                               <div>เสียง: ${amphoe.noise}</div>
                               <div>สภาพการจราจร: ${amphoe.traffic}</div>`;

          const infoWindow = new window.google.maps.InfoWindow({
            content: infoWindowContent,
          });

          infoWindow.setPosition(circle.getCenter());
          infoWindow.open(map);
          setSelectedAmphoe(amphoe);
        });
      });
    }
  };

  const handleSearch = () => {
  if (searchLat !== '' && searchLng !== '' && !isNaN(parseFloat(searchLat)) && !isNaN(parseFloat(searchLng))) {
    const lat = parseFloat(searchLat);
    const lng = parseFloat(searchLng);

    console.log({ lat });
    console.log({ lng });

    if (!isNaN(lat) && !isNaN(lng)) {
      const mapElement = document.getElementById('map');

      if (mapElement && window.google && window.google.maps) {
        // Assuming items is your array of amphoes
        const nearestAmphoe = findNearestAmphoe(lat, lng, items);

        if (nearestAmphoe) {
          const map = new window.google.maps.Map(mapElement, {
            center: { lat: nearestAmphoe.Latitude, lng: nearestAmphoe.Longitude },
            zoom: 10,
          });

          const circle = new window.google.maps.Circle({
            strokeColor: '#0000FF',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#0000FF',
            fillOpacity: 0.35,
            map: map,
            center: { lat: nearestAmphoe.Latitude, lng: nearestAmphoe.Longitude },
            radius: 15000,
          });

          window.google.maps.event.addListener(circle, 'click', (event) => {
            const infoWindowContent = `
              <div>Lat: ${nearestAmphoe.Latitude} Long: ${nearestAmphoe.Longitude}</div>
              <div>อำเภอ: ${nearestAmphoe.name}</div>
              <div>PM2.5: ${nearestAmphoe.PM25}</div>
              <div>อุณหภูมิ: ${nearestAmphoe.temp}</div>
              <div>ความชื้น: ${nearestAmphoe.humid}</div>
              <div>แรงลม: ${nearestAmphoe.wind}</div>
              <div>เสียง: ${nearestAmphoe.noise}</div>
              <div>สภาพการจราจร: ${nearestAmphoe.traffic}</div>`;

            const infoWindow = new window.google.maps.InfoWindow({
              content: infoWindowContent,
            });

            infoWindow.setPosition(circle.getCenter());
            infoWindow.open(map);
            setSelectedAmphoe(nearestAmphoe);
          });
        } else {
          console.error('Error: No amphoe found near the provided coordinates');
        }
      } else {
        console.error('Error: Map element not found or Google Maps not initialized.');
      }
    } else {
      console.error('Error: Provided latitude or longitude is not a valid number');
    }
  } else {
    console.error('Error: Please provide both latitude and longitude');
  }
};

// Function to find the nearest amphoe
const findNearestAmphoe = (lat: number, lng: number, amphoes: Amphoe[]): Amphoe | null => {
  let nearestAmphoe: Amphoe | null = null;
  let minDistance = Number.MAX_VALUE;

  amphoes.forEach((amphoe) => {
    const distance = calculateDistance(lat, lng, amphoe.Latitude, amphoe.Longitude);

    if (distance < minDistance) {
      minDistance = distance;
      nearestAmphoe = amphoe;
    }
  });

  return nearestAmphoe;
};

// Function to calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
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

  return (
    <>
      <div className='mt-10'>
      <div>
  <label>Latitude:</label>
  <input type='text' value={searchLat} onChange={(e) => setSearchLat(e.target.value)} />
</div>
<div>
  <label>Longitude:</label>
  <input type='text' value={searchLng} onChange={(e) => setSearchLng(e.target.value)} />
</div>
<button id='searchButton' onClick={handleSearch}>Search</button>

        <div id='map' style={{ height: '600px', width: '100%' }}></div>
        <br />
        {selectedAmphoe && (
          <div>
            <h2>ข้อมูลอำเภอที่ค้นหา</h2>
            <div>อำเภอ: {selectedAmphoe.name}</div>
            <div>PM2.5: {selectedAmphoe.PM25}</div>
            <div>อุณหภูมิ: {selectedAmphoe.temp}</div>
            <div>ความชื้น: {selectedAmphoe.humid}</div>
            <div>แรงลม: {selectedAmphoe.wind}</div>
            <div>เสียง: {selectedAmphoe.noise}</div>
            <div>สภาพการจราจร: {selectedAmphoe.traffic}</div>
          </div>
        )}
        <DetailsPM />
      </div>
    </>
  );
};

export default TestMap;
