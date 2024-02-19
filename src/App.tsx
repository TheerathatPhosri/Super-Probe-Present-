import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Backendlayout from './Layout/Backendlayout';
import Station from './page/Station'
import StationDetails from './page/StationDetails';
import Map from './page/Map'
import Weather from './page/Weather';
import { ClassNames } from '@emotion/react';
import Article from './page/Article';
import PMcontent from './page/PM_content';
import Noise_content from './page/Noise_content';
import Traffic from './page/Traffic';
import TestMap from './page/TestMap';
import Home from './page/Home';

function App() {
  document.title = 'React API TEST'
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Backendlayout/>}>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/stationdetails" element={<StationDetails/>}></Route>
            <Route path="/map" element={<Map/>}></Route>
            <Route path="/weather" element={<Weather/>}></Route>
            <Route path="/article" element={<Article/>}></Route>
            <Route path="/pmcontent" element={<PMcontent/>}></Route>
            <Route path="/noisecontent" element={<Noise_content/>}></Route>
            <Route path="/traffic" element={<Traffic/>}></Route>
            <Route path="/TestMap" element={<TestMap/>}></Route>
            <Route path="/Station" element={<Station/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
