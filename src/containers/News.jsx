import React from 'react';
import Loading from '../components/Loading';
import HeaderBar from "../components/HeaderBar";
import * as colors from '../constants/colors'
import './News.css';

const themeColor = colors.NEWS_THEME;

class News extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      currentNews: 0,
			news: []
    }
	}

	componentDidMount() {
		// this.setState({
		// 	news: [{
		// 		title: 'Christmas at CIT'
		// 	}]
		// })
	}

	render() {
    let content;
    if (this.state.news.length === 0) {
      content = <Loading/>;
    } else {
    	content = (
    		<div className='news-content'>
    		</div>
  		)
    }

		return (
			<div className='news'>
				<HeaderBar
					goBack={this.props.history.goBack}
					title={'What\'s Happening'}
					color={themeColor}
				/>
				{content}
			</div>
		)
	}
}

export default News
