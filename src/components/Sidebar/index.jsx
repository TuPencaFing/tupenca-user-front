import React from 'react'
import './styles.scss'
import SidebarData from './SidebarData'

function Sidebar(props){

    let sidebarType;
    const companyCode = props.companyCode;

    switch (props.type) {
        case 'administration':
          sidebarType = 'administration';
          break;
        case 'employeeAdministration':
          sidebarType = 'employeeAdministration';
          break;
        case 'pencas':
          sidebarType = 'pencas';
          break;
        default:
          break;
      }
      
    return (
        <div className="Sidebar">
            <ul className="SidebarList">
                <li
                    className="row1">
                    <div>
                        CONFIGURACIONES
                    </div>
                </li>
                {SidebarData(sidebarType,companyCode).map((val,key) =>{
                    return  val.title ? (
                        <li key={key} 
                            className="row"
                            id={window.location.pathname == val.link ? "active" : ""}
                            onClick={() => {window.location.pathname = val.link}}>
                            <div>
                                {val.title}
                            </div>
                        </li>
                ) : ("")})}
            </ul>
        </div>
    )
}

export default Sidebar