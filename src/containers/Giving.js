import React from 'react';
import HeaderBar from "../components/HeaderBar";
import './Giving.css';
import * as colors from "../constants/colors";

class Giving extends React.Component {
	render() {
		return (
			<div>
				<HeaderBar
					goBack={this.props.history.goBack}
					title={'Giving'}
				/>
				<div style={styles.container}>
					<div className='questionAnswer'>
						<h1>Why give?</h1>
						<p>The simple answer is we believe everything we have comes from God in the first place. We give because we
							believe God has entrusted us to be leaders for hope in our church and our community.</p>
						<h1>What Does tithe mean?</h1>
						<p>The Bible teaches that a guideline for giving is called the tithe (Leviticus 27:30). That is giving 10%
							of what we earn back to God.</p>
						<h1>What does offering mean?</h1>
						<p>An offering is a gift given to a specific need above and beyond our tithe.</p>
						<h1>What does the bible say?</h1>
						<p>Giving acknowledges God as the giver of everything we have (James 1:17). Giving reflects our trust that
							God will provide for us (Matthew 6:19-24). Giving allows us to be active participants in God's work on
							earth (2 Corinthians 9:6-7). Giving at Journey is simple and secure.</p>
						<a
							style={styles.giveBtn}
							href='https://www.canadahelps.org/en/dn/20223'
						>
							GIVE
						</a>
					</div>
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
		paddingLeft: 25,
		paddingRight: 25,
		paddingTop: 10,
		paddingBottom: 10,
		borderRadius: 5,
		textDecoration: 'none',
		color: colors.WHITE,
		backgroundColor: colors.PURPLE,
	},
	giveBtnText: {}
};

export default Giving
