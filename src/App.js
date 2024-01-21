// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import CardDetails from './pages/CardDetails';
import Upload from './pages/Upload';
import Test from './pages/Test';
import toast, { Toaster } from 'react-hot-toast';
import FoodItemsList from './pages/FoodItemsList'
import Feedback from './pages/Feedback';

function App() {
  return (
    <>
      <Toaster />
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/card-details/:id" element={<CardDetails />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/test" element={<Test />} />
          <Route path='/list' element={<FoodItemsList />} />
          <Route path='/feedback' element={<Feedback/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
