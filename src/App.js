import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CompanyHome from './pages/CompanyHome';
import CompanyLogin from './pages/CompanyLogin';
import CompanyLogout from './pages/CompanyLogout';
import CompanyPencaDetail from './pages/CompanyPencaDetail';
import CompanyPencaInviteUser from './pages/CompanyPencaInviteUser';
import CompanyPencas from './pages/CompanyPencas';
import CompanyRegister from './pages/CompanyRegister';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import MisPencas from './pages/MisPencas';
import Pencas from './pages/Pencas';
import Payment from './pages/Payment';
import Register from './pages/Register';
import UpcomingEvents from './pages/UpcomingEvents';
import UserInvitation from './pages/UserInvitation';
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
                <Route path={`${ROUTES.companyAdmin}/:companyCode/login`} element={<CompanyLogin />} />
                <Route path={ROUTES.companyRegister} element={<CompanyRegister />} />
            </Route>
            <Route element={<PrivateLayout />}>
                <Route path={ROUTES.pencas} element={<Pencas />} />
                <Route path={`${ROUTES.pencas}/:pencaId/payment`} element={<Payment />} />
                <Route path={ROUTES.misPencas} element={<MisPencas />} />
                <Route path={ROUTES.upcomingEvents} element={<UpcomingEvents />} />
                <Route path={ROUTES.logout} element={<Logout />} />
                <Route path={`${ROUTES.invite}/:token`} element={<UserInvitation />} />
            </Route>
            <Route element={<CompanyLayout />}>
                <Route path={`${ROUTES.companyAdmin}/:companyCode`} element={<CompanyHome />} />
                <Route path={`${ROUTES.companyAdmin}/:companyCode/pencas`} element={<CompanyPencas />} />
                <Route path={`${ROUTES.companyAdmin}/:companyCode/pencas/:pencaId`} element={<CompanyPencaDetail />} />
                <Route path={`${ROUTES.companyAdmin}/:companyCode/pencas/:pencaId/invitarUsuario`} element={<CompanyPencaInviteUser />} />
            </Route>
            <Route path={`${ROUTES.companyAdmin}/:companyCode/logout`} element={<CompanyLogout />} />
        </Routes>
    </BrowserRouter>
);

export default App;
