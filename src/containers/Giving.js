import React from 'react';
import HeaderBar from "../components/HeaderBar";
import './Giving.css';
import * as colors from "../constants/colors";

class Giving extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			givingQuestions: '\n' +
			'\t\t\t\t\t<h1 style={styles.question}>Why give?</h1>\n' +
			'\t\t\t\t\t<p style={styles.answer}>The simple answer is we believe everything we have comes from God in the first place. We give because we\n' +
			'\t\t\t\t\t\tbelieve God has entrusted us to be leaders for hope in our church and our community.</p>\n' +
			'\t\t\t\t\t<h1 style={styles.question}>What Does tithe mean?</h1>\n' +
			'\t\t\t\t\t<p style={styles.answer}>The Bible teaches that a guideline for giving is called the tithe (Leviticus 27:30). That is giving 10%\n' +
			'\t\t\t\t\t\tof what we earn back to God.</p>\n' +
			'\t\t\t\t\t<h1 style={styles.question}>What does offering mean?</h1>\n' +
			'\t\t\t\t\t<p style={styles.answer}>An offering is a gift given to a specific need above and beyond our tithe.</p>\n' +
			'\t\t\t\t\t<h1 style={styles.question}>What does the bible say?</h1>\n' +
			'\t\t\t\t\t<p style={styles.answer}>Giving acknowledges God as the giver of everything we have (James 1:17). Giving reflects our trust\n' +
			'\t\t\t\t\t\tthat God will provide for us (Matthew 6:19-24). Giving allows us to be active participants in God\'s\n' +
			'\t\t\t\t\t\twork on earth (2 Corinthians 9:6-7). Giving at Journey is simple and secure.</p>\n\n\n' +
			'\t\t\t\t\t<p style={styles.answer}>Whether you\'d like to give a single gift, or schedule ongoing giving, just click the button below\n' +
			'\t\t\t\t\t\tto get started.</p>'
		}
	}

	componentDidMount() {
	}

	render() {
		return (
			<div>
				<HeaderBar
					goBack={this.props.history.goBack}
					title={'Giving'}
				/>
				<div style={styles.container}>
					<div className='questionAnswer' dangerouslySetInnerHTML={{__html: this.state.givingQuestions}}/>
						<a
							style={styles.giveBtn}
							href='http://churchintoronto.com/give/'
						>
							GIVE
						</a>
				</div>
			</div>
		)
	}
}

const styles = {
	container: {
		padding: 10,
	},
	giveBtn: {
		display: 'inline-block',
		marginTop: 10,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10,
		paddingBottom: 10,
		borderRadius: 5,
		textDecoration: 'none',
		color: colors.WHITE,
		backgroundColor: colors.PURPLE,
	},
	giveBtnText: {

	}
};

export default Giving
