import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
} from '@mui/material';
import debounce from 'lodash.debounce';

interface Province {
  id: number;
  name_th: string;
  name_en: string;
  geography_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface Station {
  dustboy_id: string;
  dustboy_name_th: string;
  dustboy_name_en: string;
  dustboy_lat: string;
  dustboy_lng: string;
  dustboy_pv: string;
}

const Station = () => {
  const [items, setItems] = useState<Station[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);

  useEffect(() => {
    // เรียก API สำหรับข้อมูลจังหวัด
    fetch('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json')
      .then((res) => res.json())
      .then((result) => {
        // นำข้อมูลจังหวัดมาเก็บใน state
        setProvinces(result);
      });
  }, []);

  useEffect(() => {
    // เรียก API สำหรับข้อมูลจุดตรวจวัดคุณภาพอากาศ
    fetch('https://www.cmuccdc.org/api/ccdc/stations')
      .then((res) => res.json())
      .then((result) => {
        // นำข้อมูลจุดตรวจวัดคุณภาพอากาศมาเก็บใน state
        setItems(result);
        console.log(result);
      });
  }, []);

  const handleSearchChange = debounce((value: string) => {
    setSearchTerm(value);
  }, 300);

  const filteredItems = items.filter(
    (row) =>
      (selectedProvince === null ||
        row.dustboy_name_th.toLowerCase().includes(selectedProvince.name_th.toLowerCase())) &&
      row.dustboy_name_th.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <>
      <Typography sx={{textAlign:'center',color:'#0c364c',fontSize:'2rem',marginTop:'1.5rem'}}  >
        จุดตรวจวัดคุณภาพอากาศทั้งหมด ที่มีการเก็บข้อมูล
      </Typography>
      <Container maxWidth="lg" sx={{ px: 2, marginTop: 5 }}>
        <TextField
          label="ค้นหาชื่อ (ภาษาไทย)"
          variant="outlined"
          fullWidth
          onChange={(e) => handleSearchChange(e.target.value)}
          sx={{ marginTop: 2 }}
        />
        <TextField
          select
          label="เลือกจังหวัด"
          value={selectedProvince ? selectedProvince.id : ''}
          onChange={(e) => setSelectedProvince(provinces.find((p) => p.id === Number(e.target.value)) || null)}
          variant="outlined"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          <MenuItem value="" key="all">
            ทั้งหมด
          </MenuItem>
          {provinces.map((province) => (
            <MenuItem key={province.id} value={province.id}>
              {province.name_th}
            </MenuItem>
          ))}
        </TextField>
        <TableContainer component={Paper} sx={{ boxShadow: 3, marginTop: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: '#0c364c', color: 'white', fontWeight: 'bold' }}>
              <TableRow>
                <TableCell align="center" sx={{ color: 'white',fontWeight: 'bold' }}>ID</TableCell>
                <TableCell align="center" sx={{ color: 'white',fontWeight: 'bold' }}>ชื่อ (ภาษาไทย)</TableCell>
                <TableCell align="center" sx={{ color: 'white',fontWeight: 'bold' }}>ชื่อ (ภาษาอังกฤษ)</TableCell>
                <TableCell align="center" sx={{ color: 'white',fontWeight: 'bold' }}>Latitude</TableCell>
                <TableCell align="center" sx={{ color: 'white',fontWeight: 'bold' }}>Longitude</TableCell>
                <TableCell align="center" sx={{ color: 'white',fontWeight: 'bold' }}>PM 2.5 (μg/m3)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((row) => (
                (selectedProvince === null ||
                  row.dustboy_name_th.toLowerCase().includes(selectedProvince.name_th.toLowerCase())) && (
                  <TableRow
                    key={row.dustboy_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {row.dustboy_id}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {row.dustboy_name_th}
                    </TableCell>
                    <TableCell
                      sx={{ cursor: 'pointer' }}
                      onClick={() => console.log('Hello')}
                      align="center"
                    >
                      {row.dustboy_name_en}
                    </TableCell>
                    <TableCell align="center">{row.dustboy_lat}</TableCell>
                    <TableCell align="center">{row.dustboy_lng}</TableCell>
                    <TableCell align="center">{row.dustboy_pv}</TableCell>
                  </TableRow>
                )
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Station;
