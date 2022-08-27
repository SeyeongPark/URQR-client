import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import EditCard from './pages/Edit';
import InputData from './pages/Input';
import Result from './pages/Result';
import SearchCard from './pages/SearchCard';

function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route path='/' element={<InputData/>}/>
          <Route path='/result' element={<Result/>} />
          <Route path='/edit/:qrText' element={<EditCard/>} />
          <Route path='/search/:qrText' element={<SearchCard/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
