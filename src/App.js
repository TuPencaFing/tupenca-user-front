import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CompanyLogin from './pages/Company/CompanyLogin';
import CompanyLogout from './pages/Company/CompanyLogout';
import CompanyPayment from './pages/Company/CompanyPayment';
import CompanyPencaInviteUser from './pages/Company/CompanyPencaInviteUser';
import CompanyPencas from './pages/Company/CompanyPencas';
import CompanyPencaCreate from './pages/Company/CompanyPencaCreate';
import CompanyPencaSendNews from './pages/Company/CompanyPencaSendNews';
import CompanyPencaUsers from './pages/Company/CompanyPencaUsers';
import CompanyEmployees from './pages/Company/CompanyEmployees';
import CompanyEmployeeCreate from './pages/Company/CompanyEmployeeCreate';
import CompanyConfigurations from './pages/Company/CompanyConfigurations';
import CompanyPlans from './pages/Company/CompanyPlans';
import CompanyRegister from './pages/Company/CompanyRegister';
import CompanyRegisterFinished from './pages/Company/CompanyRegisterFinished';
import CompanyUserPencas from './pages/CompanyUser/CompanyUserPencas';
import CompanyUserPencaEvents from './pages/CompanyUser/CompanyUserPencaEvents';
import CompanyUserPencaEventDetail from './pages/CompanyUser/CompanyUserPencaEventDetail';
import CompanyUserPencaParticipants from './pages/CompanyUser/CompanyUserPencaParticipants';
import CompanyUserPencaForum from './pages/CompanyUser/CompanyUserPencaForum';
import Home from './pages/User/Home';
import Login from './pages/User/Login';
import Logout from './pages/Logout';
import MisPencas from './pages/User/MisPencas';
import PencaPayment from './pages/User/PencaPayment';
import Pencas from './pages/User/Pencas';
import PencaForum from './pages/User/PencaForum';
import PencaEventDetail from './pages/User/PencaEventDetail';
import PencaEventResults from './pages/User/PencaEventResults';
import PencaParticipants from './pages/User/PencaParticipants';
import Prizes from './pages/User/Prizes';
import PrizesAlreadyClaimed from './pages/User/PrizesAlreadyClaimed';
import PrizeDetail from './pages/User/PrizeDetail';
import Register from './pages/User/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import UserInvitation from './pages/User/UserInvitation';
import CompanyLayout from './router/CompanyLayout';
import CompanyUserLayout from './router/CompanyUserLayout';
import PrivateLayout from './router/PrivateLayout';
import PublicOnlyLayout from './router/PublicOnlyLayout';
import ROUTES from './utils/routes';

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicOnlyLayout />}>
                    <Route path={ROUTES.home} element={<Home />} />
                    <Route path={ROUTES.login} element={<Login />} />
                    <Route path={ROUTES.forgotPassword} element={<ForgotPassword />} />
                    <Route path={ROUTES.resetPassword} element={<ResetPassword />} />
                    <Route path={ROUTES.register} element={<Register />} />

                    {/* Company routes */}
                    <Route path={`${ROUTES.companyAdmin}/:companyCode/login`} element={<CompanyLogin />} />
                    <Route path={ROUTES.companyPlans} element={<CompanyPlans />} />
                    <Route path={`${ROUTES.companies}/registrationFinished`} element={<CompanyRegisterFinished />} />
                    <Route path={`${ROUTES.companyPlans}/:planId`} element={<CompanyRegister />} />
                    <Route path={`${ROUTES.companyPlans}/:planId/pago`} element={<CompanyPayment />} />
                </Route>
                <Route element={<PrivateLayout />}>
                    <Route path={ROUTES.pencas} element={<Pencas />} />
                    <Route path={`${ROUTES.pencas}/:pencaId`} element={<PencaEventResults />} />
                    <Route path={`${ROUTES.pencas}/:pencaId/eventos`} element={<PencaEventResults />} />
                    <Route path={`${ROUTES.pencas}/:pencaId/eventos/:eventId`} element={<PencaEventDetail />} />
                    <Route path={`${ROUTES.pencas}/:pencaId/participantes`} element={<PencaParticipants />} />
                    <Route path={`${ROUTES.pencas}/:pencaId/foro`} element={<PencaForum />} />
                    <Route path={`${ROUTES.pencas}/:pencaId/pago`} element={<PencaPayment />} />
                    <Route path={ROUTES.misPencas} element={<MisPencas />} />
                    <Route path={ROUTES.logout} element={<Logout />} />
                    <Route path={`${ROUTES.invite}/:token`} element={<UserInvitation />} />
                    <Route path={ROUTES.prizes} element={<Prizes />} />
                    <Route path={ROUTES.prizesToBeClaimed} element={<Prizes />} />
                    <Route path={ROUTES.prizesAlreadyClaimed} element={<PrizesAlreadyClaimed />} />
                    <Route path={`${ROUTES.prizes}/:prizeId`} element={<PrizeDetail />} />
                </Route>
                <Route element={<CompanyLayout />}>
                    <Route path={`${ROUTES.companyAdmin}/:companyCode`} element={<CompanyPencas />} />
                    <Route path={`${ROUTES.companyAdmin}/:companyCode/pencas`} element={<CompanyPencas />} />
                    <Route path={`${ROUTES.companyAdmin}/:companyCode/pencas/crear`} element={<CompanyPencaCreate />} />
                    <Route path={`${ROUTES.companyAdmin}/:companyCode/pencas/:pencaId`} element={<CompanyPencaUsers />} />
                    <Route path={`${ROUTES.companyAdmin}/:companyCode/pencas/:pencaId/usuarios`} element={<CompanyPencaUsers />} />
                    <Route path={`${ROUTES.companyAdmin}/:companyCode/pencas/:pencaId/usuarios/invitar`} element={<CompanyPencaInviteUser />} />
                    <Route path={`${ROUTES.companyAdmin}/:companyCode/pencas/:pencaId/enviar-novedades`} element={<CompanyPencaSendNews />} />
                    <Route path={`${ROUTES.companyAdmin}/:companyCode/administracion`} element={<CompanyEmployees />} />
                    <Route path={`${ROUTES.companyAdmin}/:companyCode/administracion/funcionarios`} element={<CompanyEmployees />} />
                    <Route path={`${ROUTES.companyAdmin}/:companyCode/administracion/funcionarios/crear`} element={<CompanyEmployeeCreate />} />
                    <Route path={`${ROUTES.companyAdmin}/:companyCode/administracion/configuraciones`} element={<CompanyConfigurations />} />
                </Route>
                <Route element={<CompanyUserLayout />}>
                    <Route path={`${ROUTES.companies}/:companyCode${ROUTES.pencas}`} element={<CompanyUserPencas />} />
                    <Route path={`${ROUTES.companies}/:companyCode${ROUTES.pencas}/:pencaId`} element={<CompanyUserPencaEvents />} />
                    <Route path={`${ROUTES.companies}/:companyCode${ROUTES.pencas}/:pencaId/eventos`} element={<CompanyUserPencaEvents />} />
                    <Route path={`${ROUTES.companies}/:companyCode${ROUTES.pencas}/:pencaId/eventos/:eventId`} element={<CompanyUserPencaEventDetail />} />
                    <Route path={`${ROUTES.companies}/:companyCode${ROUTES.pencas}/:pencaId/participantes`} element={<CompanyUserPencaParticipants />} />
                    <Route path={`${ROUTES.companies}/:companyCode${ROUTES.pencas}/:pencaId/foro`} element={<CompanyUserPencaForum />} />
                </Route>
                <Route path={`${ROUTES.companyAdmin}/:companyCode/logout`} element={<CompanyLogout />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
