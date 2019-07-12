import React, { Component } from "react";

import DashboardDocente from "./dashboardDocente";
import DashboardEstablecimientoEducativo from "./dashboardEstablecimientoEducativo";

class Dashboard extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                {this.props.userType === "docente" ? <DashboardDocente /> : <DashboardEstablecimientoEducativo />}
            </div>
        );
    }
}

export default Dashboard;