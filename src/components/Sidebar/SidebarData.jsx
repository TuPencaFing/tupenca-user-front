import React, {useState} from 'react'
import { useEffect } from 'react';
import useCompanyPencas from '../../hooks/useCompanyPencas';

function SidebarData(type) {
    var rows = useState([]);
    const {loading, pencas} = useCompanyPencas();

    switch (type) {
        case 'employeeAdministration':
            rows.push({
                title: 'General',
                link: window.location.pathname
            });
            break;
        case 'administration':
            rows.push({
                title: 'General',
                link: "/administrationGeneral"
            });
            rows.push({
                title: 'Look & Feel',
                link: "/administrationLookAndFeel"
            });
            rows.push({
                title: 'Look & Feel mail',
                link: "/administrationLookAndFeelMail"
            });
            break;
        case 'pencas':
            rows.push({
                title: 'General',
                link: "/pencasGeneral"
            });
            pencas.map((row)=> rows.push({ 
                title: row.title, 
                link: "/pencasGeneral/" + row.id 
            }));
            break;
        default:
                break;
    }

    return rows;
}

export default SidebarData