import React from "react";

import Perfil from "./perfil";

function VisorPerfiles(props) {
    return (
        <div>
            {props.perfiles.map(perfil => {
                return <Perfil key={perfil.perfilID} perfil={perfil} />
            })}
        </div>
    );
}

export default VisorPerfiles;