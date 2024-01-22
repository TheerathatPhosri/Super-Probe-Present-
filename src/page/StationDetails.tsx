import { Container,Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState,useEffect } from 'react';

// สร้าง interface สำหรับรูปแบบของข้อมูล
interface Station {
  dustboy_id: string;
  dustboy_name_th: string;
  dustboy_name_en: string;
  dustboy_lat: string;
  dustboy_lng: string;
  dustboy_pv: string;
  // เพิ่ม properties อื่น ๆ ตามความต้องการ
}

const StationsDetails = () => {

  const [items, setItems] = useState<Station[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://www.cmuccdc.org/api/ccdc/station/6");
        const result = await response.json();
        // console.log(JSON.stringify(result, null, 2));

        if (result && result.dustboy_id) {
          // เรียกใช้ API ที่ถูกต้อง (เช่น result.stations หรือ result.data.stations)
          setItems([result]);
        } else {
          console.error("API response does not contain the expected data");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <>
    <Typography variant="h4" color="primary" sx={{ textAlign:'center',marginTop:3 }}>
      จุดตรวจวัดคุณภาพอากาศทั้งหมด ที่มีการเก็บข้อมูล
    </Typography>
    <Container maxWidth='lg' sx={{ px : 2 , marginTop:5}}>
        <TableContainer component={Paper} sx={{boxShadow:3}}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell>ID</TableCell> */}
                <TableCell align="center">ชื่อ (ภาษาไทย)</TableCell>
                <TableCell align="center">ชื่อ (ภาษาอังกฤษ)</TableCell>
                <TableCell align="center">Latitude</TableCell>
                <TableCell align="center">Longitude</TableCell>
                <TableCell align="center">PM 2.5 (μg/m3)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <TableRow
                  key={row.dustboy_id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {/* <TableCell component="th" scope="row">
                    {row.dustboy_id}
                  </TableCell> */}
                  <TableCell component="th" scope="row" align='center'>
                    {row.dustboy_name_th}
                  </TableCell>
                  <TableCell sx={{ cursor:'pointer' }} onClick={()=>console.log("Hello")} align="center">{row.dustboy_name_en}</TableCell>
                  <TableCell align="center">{row.dustboy_lat}</TableCell>
                  <TableCell align="center">{row.dustboy_lng}</TableCell>
                  <TableCell align="center">{row.dustboy_pv}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </TableContainer>
    </Container>
    </>
  )
}

export default StationsDetails