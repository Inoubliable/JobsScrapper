var React = require('react');
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const style = {
	jobCard: {
		marginTop: 20
	}
};

class Job extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var {title, description, employer, place} = this.props;

		return (
			<Card style={style.jobCard}>
				<CardTitle title={title} subtitle={employer + ', ' + place} />
				<CardText>
					{description}
				</CardText>
			</Card>
		)
	}

}

module.exports = Job;