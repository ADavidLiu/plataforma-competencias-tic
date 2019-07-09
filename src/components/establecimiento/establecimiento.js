import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";

class Establecimiento extends Component {
	constructor() {
		super();

		this.tipoUbicacion = ["Vereda", "Corregimiento", "Barrio", "Localidad"];
		this.tipoZona = ["Rural", "Urbana"];
		this.tipoRegimen = ["Oficial", "Privado", "Concesión"];

		this.state = {
			nombre: "",
			direccion: "",
			tipoUbicacion: "",
			nombreUbicacion: "",
			tipoZona: "",
			tipoRegimen: "",
			telefono: "",
			correo: "",
			sitioWeb: ""
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.isCompletado !== prevProps.isCompletado) {
			this.props.actualizarInfoSedes(this.state);
		}
	}

	handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
		});
	}

	render = () => {
		return (
			<div className="mb-2">
				<hr />
				<Typography variant="body1">
					<strong>Información de la Sede {this.props.id}</strong>
				</Typography>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id={"nombre-ee-" + this.props.id}
					label="Nombre"
					name="nombre"
					onChange={this.handleChange}
				/>
				<TextField
					className="mb-2 mb-md-3"
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id={"direccion-ee-" + this.props.id}
					label="Dirección"
					name="direccion"
					onChange={this.handleChange}
				/>
				<Grid container spacing={2} className="mb-1">
					<Grid item xs={12} md={6} className="py-0">
						<FormControl variant="outlined" className="w-100 mt-4 mt-md-3">
                            <InputLabel htmlFor="tipoUbicacion">Tipo de ubicación*</InputLabel>
                            <Select
                                value={this.state.tipoUbicacion}
                                onChange={this.handleChange}
                                input={<OutlinedInput required name="tipoUbicacion" id="tipoUbicacion"/>}
                            >
                                {this.tipoUbicacion.map(tipo => {
									return <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>;
								})}
                            </Select>
                        </FormControl>
					</Grid>
					<Grid item xs={12} md={6} className="py-0">
						<TextField
							className="mt-4 mt-md-3"
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id={"nombre-ubicacion-ee-" + this.props.id}
							label="Nombre de la ubicación"
							name="nombreUbicacion"
							onChange={this.handleChange}
						/>
					</Grid>
					<Grid item xs={12} md={6} className="py-0">
						<FormControl variant="outlined" className="w-100 mt-4 mt-md-3">
                            <InputLabel htmlFor="tipoZona">Zona*</InputLabel>
                            <Select
                                value={this.state.tipoZona}
                                onChange={this.handleChange}
                                input={<OutlinedInput required name="tipoZona" id="tipoZona"/>}
                            >
                                {this.tipoZona.map(tipo => {
									return <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>;
								})}
                            </Select>
                        </FormControl>
					</Grid>
					<Grid item xs={12} md={6} className="py-0">
						<FormControl variant="outlined" className="w-100 mt-4 mt-md-3">
                            <InputLabel htmlFor="tipoRegimen">Régimen*</InputLabel>
                            <Select
                                value={this.state.tipoRegimen}
                                onChange={this.handleChange}
                                input={<OutlinedInput required name="tipoRegimen" id="tipoRegimen"/>}
                            >
                                {this.tipoRegimen.map(tipo => {
									return <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>;
								})}
                            </Select>
                        </FormControl>
					</Grid>
				</Grid>
				<TextField
					className="mt-4"
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id={"telefono-ee-" + this.props.id}
					label="Teléfono"
					name="telefono"
					type="tel"
				/>
				<TextField
					className="mt-3"
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id={"correo-electronico-institucional-ee-" + this.props.id}
					label="Correo electrónico institucional"
					name="correo"
					type="email"
					onChange={this.handleChange}
				/>
				<TextField
					className="mt-3"
					variant="outlined"
					margin="normal"
					fullWidth
					id={"sitio-web-ee-" + this.props.id}
					label="Sitio web"
					name="sitioWeb"
					type="tel"
					onChange={this.handleChange}
				/>
			</div>
		);
	};
}

export default Establecimiento;
