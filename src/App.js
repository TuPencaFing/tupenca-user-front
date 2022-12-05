import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CompanyHome from './pages/Company/CompanyHome';
import CompanyLogin from './pages/Company/CompanyLogin';
import CompanyLogout from './pages/Company/CompanyLogout';
import CompanyPencaDetail from './pages/Company/CompanyPencaDetail';
import CompanyPencaInviteUser from './pages/Company/CompanyPencaInviteUser';
import CompanyPencas from './pages/Company/CompanyPencas';
import CompanyRegister from './pages/Company/CompanyRegister';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import MisPencas from './pages/MisPencas';
import Payment from './pages/Payment';
import Pencas from './pages/Pencas';
import PencaForum from './pages/PencaForum';
import PencaEventDetail from './pages/PencaEventDetail';
import PencaEventResults from './pages/PencaEventResults';
import PencaParticipants from './pages/PencaParticipants';
import Register from './pages/Register';
import UserInvitation from './pages/UserInvitation';
import CompanyLayout from './router/CompanyLayout';
import PrivateLayout from './router/PrivateLayout';
import PublicOnlyLayout from './router/PublicOnlyLayout';
import ROUTES from './utils/routes';
import TestHome from "./pages/TestHome";

const App = () => {
    const companyCode = window.location.host.split(".")[0];
    if (companyCode === "fing") {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path={ROUTES.home} element={<TestHome companyCode={companyCode} />} />
                </Routes>
            </BrowserRouter>
        );
    }

    return (
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
                    <Route path={`${ROUTES.pencas}/:pencaId`} element={<PencaEventResults />} />
                    <Route path={`${ROUTES.pencas}/:pencaId/eventos`} element={<PencaEventResults />} />
                    <Route path={`${ROUTES.pencas}/:pencaId/eventos/:eventId`} element={<PencaEventDetail />} />
                    <Route path={`${ROUTES.pencas}/:pencaId/participantes`} element={<PencaParticipants />} />
                    <Route path={`${ROUTES.pencas}/:pencaId/foro`} element={<PencaForum />} />
                    <Route path={`${ROUTES.pencas}/:pencaId/pago`} element={<Payment />} />
                    <Route path={ROUTES.misPencas} element={<MisPencas />} />
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
};

export default App;
