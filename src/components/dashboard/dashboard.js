import React, { Component } from "react";

import DashboardDocente from "./dashboardDocente";
import DashboardEstablecimientoEducativo from "./dashboardEstablecimientoEducativo";
import DashboardGobierno from "./dashboardGobierno";

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
            case "ESTABLECIMIENTO":
                this.dashboard = <DashboardEstablecimientoEducativo />;
                break;
            case "GOBIERNO":
                this.dashboard = <DashboardGobierno />;
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