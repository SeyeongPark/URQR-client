import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './App-mobile.css'
import ErrorPage from './pages/Error';

import EditCard from './pages/Edit';
import InputData from './pages/Input';
import Result from './pages/Result';
import SearchCard from './pages/SearchCard';
import SampleFormImageUpload from './app/Sample/SampleFormImageUpload';

function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route path='/error' element={<ErrorPage/>}/>

          <Route path='/' element={<InputData/>}/>
          <Route path='/result' element={<Result/>} />
          <Route path='/edit/:qrText' element={<EditCard/>} />
          <Route path='/search/:qrText' element={<SearchCard/>} />
          <Route path='sample' element={<SampleFormImageUpload/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
