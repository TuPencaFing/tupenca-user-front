import React from 'react';
import { EMPLOYEE_PAGES, USER_ROUTES } from "../../../utils/navbarItems";
import Navbar from "../../../components/Navbar";
import Alert from "@mui/material/Alert";

const CompanyRegisterFinished = () => {

    return (
        <>
            <Navbar
                pages={EMPLOYEE_PAGES}
                routes={USER_ROUTES}
            />
            <div style={{ width: '60%', margin: '16px auto' }}>
                <Alert severity="success">
                    Ha completado el proceso con éxito! Cuando el Tenant esté listo recibirá un mail con indicaciones
                </Alert>
            </div>
        </>
    );
};

export default CompanyRegisterFinished;
