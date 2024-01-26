const express = require('express');
const fs = require('fs');
const app = express();
const port = 3001; // เลือก port ที่ใช้ได้

app.get('/api/hotels', (req, res) => {
  try {
    const csvData = fs.readFileSync('public/Data/hotel-opendata.csv', 'utf-8');
    const parsedData = parseCSV(csvData);
    res.json(parsedData);
  } catch (error) {
    console.error('อ่านหรือแปลง CSV ผิดพลาด:', error);
    res.status(500).json({ error: 'ข้อผิดพลาดภายในเซิร์ฟเวอร์' });
  }
});

function parseCSV(csvData) {
  const lines = csvData.split('\n');
  const headers = lines[0].split(','); // ปรับตามโครงสร้างของ CSV ของคุณ

  const hotels = [];

  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(',');

    if (currentLine.length === headers.length) {
      const hotel = {};

      for (let j = 0; j < headers.length; j++) {
        hotel[headers[j]] = currentLine[j].trim();
      }

      hotels.push(hotel);
    }
  }

  return hotels;
}


app.listen(port, () => {
  console.log(`เซิร์ฟเวอร์ทำงานที่พอร์ต ${port}`);
});