var React = require('react');
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const style = {
	jobCard: {
		width: '70%',
		margin: 'auto',
		marginTop: 30
	}
};

class Job extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var {title, description, employer, location, postedDate, link} = this.props;

		return (
				<Card style={style.jobCard}>
					<a href={link} target="_blank">
						<CardTitle title={title} subtitle={employer + ', ' + location + ' - ' + postedDate} />
						<CardText>
							{description}
						</CardText>
					</a>
				</Card>
		)
	}

}

module.exports = Job;