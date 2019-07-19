import React, { Component } from "react";

import preguntas from "../../models/preentrevista";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from "@material-ui/core/FormControl";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

class PreentrevistaNew extends Component {
	constructor() {
		super();
		this.state = {
			respuestas: [],
			preguntas: []
		};
	}
	render() {
		return (
			<div>
				<h1>Preguntas</h1>
				<form onSubmit={this.handleSubmit}>
					{this.state.preguntas.map(pregunta =>
						this.renderPregunta(pregunta)
					)}
				</form>
			</div>
		);
	}
	componentDidMount() {
		this.setState({
			preguntas: preguntas
		});
		console.log(preguntas);
	}

	handleRespuestaSeleccionada = (e) => {
        
		var parent =
			e.currentTarget.parentNode.parentNode.parentElement.parentElement
                .parentElement;
        var level = parseInt(parent.parentElement.className);
        console.log(parent)
		var elements = parent.getElementsByClassName(level + 2);
		for (var element of elements) {
			if (element.classList.contains("d-none")) {
				element.classList.remove("d-none");
			} else {
				element.classList.add("d-none");
			}
		}
		elements = parent.getElementsByClassName(level + 3);
		for (var element of elements) {
			if (element.classList.contains("d-none")) {
				element.classList.remove("d-none");
			} else {
				element.classList.add("d-none");
			}
		}
	};

	renderPregunta(pregunta, groupName, level) {
		if (!level) {
			level = 0;
		}
		return (
			<div
				style={{ paddingLeft: "5em" }}
				class={level > 1 ? "d-none " + level : level}
			>
				{this.createElementPregunta(pregunta, groupName)}
				{pregunta.options ? (
					pregunta.options[0].typeOfAnswer === "RADIO" ? (
						<RadioGroup
							name={groupName}
							key={groupName + Math.random()}
							onChange={e => { this.handleRespuestaSeleccionada(e); }}
						>
							{pregunta.options.map((option, index) => {
								return this.renderPregunta(
									option,
									pregunta.label,
									level + 1
								);
							})}
						</RadioGroup>
					) : (
						pregunta.options.map((option, index) => {
							return this.renderPregunta(
								option,
								pregunta.label,
								level + 1
							);
						})
					)
				) : (
					""
				)}
			</div>
		);
	}
	createElementPregunta(pregunta, group) {
		if (!pregunta.typeOfAnswer) {
			return (
				<Typography key={group + 1} variant="body1">
					{pregunta.label}
				</Typography>
			);
		} else {
			switch (pregunta.typeOfAnswer) {
				case "RADIO":
					return (
						<FormControlLabel
							value={pregunta.label}
							control={<Radio required color="primary" />}
							label={pregunta.label}
						/>
					);
					break;
				case "INPUT":
					return (
						<TextField
							key=""
							variant="outlined"
							margin="normal"
							required
							fullWidth
							multiline
							inputProps={{ maxLength: 400 }}
							rows="5"
							label={pregunta.label}
							name={pregunta.label}
						/>
					);
					break;
				case "CHECKBOX":
					return (
						<FormControlLabel
							key=""
							className="mt-3"
							control={
								<Checkbox
									onChange={e => { this.handleRespuestaSeleccionada(e); }}
									color="primary"
									value={pregunta.label}
									name={pregunta.label}
								/>
							}
							label={pregunta.label}
						/>
					);
					break;
				default:
					break;
			}
		}
	}
}
export default PreentrevistaNew;