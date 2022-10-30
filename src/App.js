import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CompanyHome from './pages/CompanyHome';
import CompanyLogin from './pages/CompanyLogin';
import CompanyLogout from './pages/CompanyLogout';
import CompanyRegister from './pages/CompanyRegister';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import UpcomingEvents from './pages/UpcomingEvents';
import CompanyLayout from './router/CompanyLayout';
import PrivateLayout from './router/PrivateLayout';
import PublicOnlyLayout from './router/PublicOnlyLayout';
import ROUTES from './utils/routes';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route element={<PublicOnlyLayout />}>
                <Route path={ROUTES.home} element={<Home />} />
                <Route path={ROUTES.login} element={<Login />} />
                <Route path={ROUTES.register} element={<Register />} />

                {/* Company routes */}
                <Route path={`${ROUTES.companies}/:companyCode/admin/login`} element={<CompanyLogin />} />
                <Route path={ROUTES.companyRegister} element={<CompanyRegister />} />
            </Route>
            <Route element={<PrivateLayout />}>
                <Route path={ROUTES.pencas} element={<Home />} />
                <Route path={ROUTES.misPencas} element={<Home />} />
                <Route path={ROUTES.upcomingEvents} element={<UpcomingEvents />} />
                <Route path={ROUTES.logout} element={<Logout />} />
            </Route>
            <Route element={<CompanyLayout />}>
                <Route path={`${ROUTES.companies}/:companyCode/admin`} element={<CompanyHome />} />
            </Route>
            <Route path={`${ROUTES.companies}/:companyCode/admin/logout`} element={<CompanyLogout />} />
        </Routes>
    </BrowserRouter>
);

export default App;
