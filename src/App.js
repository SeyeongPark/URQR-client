import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './App-mobile.css'
import ErrorPage from './pages/Error';

import EditCard from './pages/Edit';
import InputData from './pages/Input';
import Result from './pages/Result';
import SearchPage from './pages/SearchPage';
import SearchedCard from './pages/SearchedCard';
import SampleFormImageUpload from './app/Sample/SampleFormImageUpload';
import Main from './pages/Main';

function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route path='/error' element={<ErrorPage/>}/>

          <Route path='/' element={<Main/>}/>
          <Route path='/create' element={<InputData/>}/>
          <Route path='/result' element={<Result/>} />
          <Route path='/edit/:qrText' element={<EditCard/>}/>
          {/* Search page that allow to input CODE */}
          <Route path='/search' element={<SearchPage/>}/>
          {/* Searched card info page */}
          <Route path='/search/:qrText' element={<SearchedCard/>}/>
          <Route path='sample' element={<SampleFormImageUpload/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
