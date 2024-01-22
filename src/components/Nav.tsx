import { AppBar, IconButton, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <>
        <AppBar 
        position="sticky"
        >
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon />
                </IconButton>
                <IconButton sx={{fontSize:'20px',ml:2}} color="inherit" component={Link} to="/">
                  หน้าหลัก
                </IconButton>

                <IconButton sx={{fontSize:'15px'}} color="inherit" component={Link} to="/stationdetails">
                  จุดตรวจวัดคุณภาพอากาศ
                </IconButton>
                <IconButton sx={{fontSize:'15px'}} color="inherit" component={Link} to="/map">
                  แผนที่
                </IconButton>
                <IconButton sx={{fontSize:'15px'}} color="inherit" component={Link} to="/weather">
                  อุณหภูมิ
                </IconButton>
            </Toolbar>
            </AppBar>
    </>
  )
}

export default Nav