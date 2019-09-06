import React, { Component } from "react";

import DashboardDocente from "./dashboardDocente";
import DashboardEstablecimientoEducativo from "./dashboardEstablecimientoEducativo";
import DashboardGobierno from "./dashboardGobierno";
import DashboardEvaluador from "./dashboardEvaluador";

class Dashboard extends Component {
    constructor() {
        super();
        this.dashboard = "";
    }

    render() {
        switch (this.props.userType) {
            case "DOCENTE":
                this.dashboard = <DashboardDocente />;
                break;
            case "INSTITUCIÓN":
                
                break;
            case "ESTABLECIMIENTO":
                this.dashboard = <DashboardEstablecimientoEducativo />;
                break;
            case "GOBIERNO":
                this.dashboard = <DashboardGobierno />;
                break;
            case "EVALUADOR":
                this.dashboard = <DashboardEvaluador />;
                break;
            default:
                break;
        }

        return (
            <div>
                {this.dashboard}
            </div>
        );
    }
}

export default Dashboard;