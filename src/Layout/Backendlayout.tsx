import { CssBaseline,Box, } from '@mui/material'
import Nav2 from '../components/Nav2'
import { Outlet } from 'react-router-dom'


const Backendlayout = () => {
  return (
    <>
    <CssBaseline />
      <Nav2 />
      <Box sx={styles.container}>
        <Box component={"main"} sx={styles.mainSection}>
          <Outlet />
        </Box>
      </Box>
    </>
  )
}

const styles = {
  container: {
    display: "flex",
    bgcolor: "neutral.light",
  },
  mainSection: {
    px: 4,
    width: "100%",
    height: "100%",
    overflow: "auto",
  },
}

export default Backendlayout