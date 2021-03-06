import React from "react";
import { withRouter } from "react-router";
import { Card, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class SpecDrink extends React.Component {
	constructor() {
		super();
		this.state = {
			drink: [],
			redirect: false,
		};
	}

	deleteHandle = async () => {
		const did = this.props.match.params.did;
		const response = await fetch(`http://192.168.0.16:5000/api/drinks/delete/${did}`, {
			method: "DELETE",
		});
		const json = await response.json();
		await this.setState({ redirect: true });

		console.log(json);
	};

	async componentWillMount() {
		const did = this.props.match.params.did;

		const response = await fetch(`http://192.168.0.16:5000/api/drinks/${did}`);
		const json = await response.json();
		await this.setState({ drink: json.drink[0] });
	}

	render() {
		const drinkName = this.state.drink.name;
		const country = this.state.drink.country;
		const rate = this.state.drink.rate;
		const comment = this.state.drink.comment;
		const date = this.state.drink.date;
		const placeOfConsumption = this.state.drink.placeOfConsumption;
		const { redirect } = this.state;
		console.log(redirect);

		if (redirect) {
			return <Redirect to='/' />;
		}

		return (
			<div align='center'>
				<Card style={{ width: "16rem" }}>
					<Card.Img height={260} variant='top' src={this.state.drink.photo} />
					<Card.Body>
						<Card.Title>{drinkName}</Card.Title>
						<div align='left'>
							<Card.Text>Страна производитель: {country}</Card.Text>
							<Card.Text>Дата: {date}</Card.Text>
							{placeOfConsumption && <Card.Text>Место пития: {placeOfConsumption}</Card.Text>}
							<Card.Text>Оценка: {rate}</Card.Text>
							<Card.Text>Комментарий: {comment}</Card.Text>
						</div>

						<Button className='button' onClick={this.deleteHandle} variant='dark'>
							Удалить
						</Button>
					</Card.Body>
				</Card>
			</div>
		);
	}
}

export default withRouter(SpecDrink);
