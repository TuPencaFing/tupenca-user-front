import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UpcomingEvents from './pages/UpcomingEvents';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Signup />} />
            <Route path="/mis-pencas" element={<Home />} />
            <Route path="/proximos-eventos" element={<UpcomingEvents />} />
        </Routes>
    </BrowserRouter>
);

export default App;
