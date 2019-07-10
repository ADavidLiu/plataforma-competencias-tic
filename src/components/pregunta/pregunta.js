import React, { Component } from "react";

import Typography from "@material-ui/core/Typography";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

class Pregunta extends Component {
    constructor() {
        super();
        this.state = {
            staterespuestaseleccionada: ""
        }
    }

    handleChange = e => {
        this.setState({
            staterespuestaseleccionada: e.target.value
        });
    }

    componentDidUpdate() {
        this.props.actualizarRespuestas({
            id: this.props.id,
            respuestaSeleccionada: this.state.staterespuestaseleccionada
        });
    }

    render() {
        const {id, codigoDescriptor, enunciado, opciones, respuesta} = this.props.data;

        return (
            <React.Fragment>
                <Typography variant="body1" className="mb-3">{enunciado}</Typography>
                <FormControl component="fieldset" className="mb-4">
                    <RadioGroup
                        aria-label="Respuesta Seleccionada"
                        staterespuestaseleccionada="staterespuestaseleccionada"
                        name={`respuestaSeleccionada-${codigoDescriptor}-${id}`}
                        value={this.state.staterespuestaseleccionada}
                        onChange={this.handleChange}
                    >
                        {opciones.map((opcion, i) => {
                            return <FormControlLabel
                                key={i}
                                value={i.toString()}
                                control={<Radio required color="primary" />}
                                label={opcion}
                            />;
                        })}
                    </RadioGroup>
                </FormControl>
            </React.Fragment>
        );
    }
}

export default Pregunta;