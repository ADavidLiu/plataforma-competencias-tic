import React, { Component } from "react";

import Typography from "@material-ui/core/Typography";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import shuffleArray from "../../utils/shuffleArray";

class Pregunta extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            staterespuestaseleccionada: ""
        }

        this.shuffledOptions = shuffleArray(props.data.opciones);
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
        const {id, codigoDescriptor, enunciado} = this.props.data;

        return (
            <React.Fragment>
                <Typography variant="body1" className="mb-4"><strong>{enunciado}</strong></Typography>
                <FormControl component="fieldset" className="mb-4">
                    <RadioGroup
                        aria-label="Respuesta Seleccionada"
                        staterespuestaseleccionada="staterespuestaseleccionada"
                        name={`respuestaSeleccionada-${codigoDescriptor}-${id}`}
                        value={this.state.staterespuestaseleccionada}
                        onChange={this.handleChange}
                    >
                        {this.shuffledOptions.map((opcion, i) => {
                            return <FormControlLabel
                                key={i}
                                value={opcion}
                                control={<Radio required color="primary" />}
                                label={opcion}
                            />;
                        })}
                    </RadioGroup>
                </FormControl>
                <hr className="mb-5"/>
            </React.Fragment>
        );
    }
}

export default Pregunta;