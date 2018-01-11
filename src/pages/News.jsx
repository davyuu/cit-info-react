import React from 'react'
import Loading from '../components/Loading'
import HeaderBar from '../components/HeaderBar'
import SectionSeparator from '../components/SectionSeparator'
import * as colors from '../constants/colors'
import images from '../images/images'
import './News.css'

const themeColor = colors.NEWS_THEME;

class News extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      currentNews: 0,
			news: []
    }
	}

  componentWillMount() {
    let dataURL = 'http://mycit.info/wp-json/wp/v2/news';
    fetch(dataURL)
  	.then(res => res.json())
    .then(res => {
      this.setState({
        news: res.map(val => {
          const message = val.acf;
          return {
            announcements: message.announcements
          };
        })
      })
    })
  }

	render() {
    let content;
    if (this.state.news.length === 0) {
      content = <Loading/>;
    } else {
			const news = this.state.news[this.state.currentNews];
			content = (
    		<div className='news-content'>
					<div className='news-header-container'>
						<img className='news-header-img' src={images.christmas}/>
					</div>
					<div className='news-container'>
						<h1 className='news-title' style={{
							color: themeColor
						}}>Christmas at CIT</h1>
						<p className='news-description'>Christmas is the time of the year your friends and family are all signing about Jesus. What an amazing opportunity to share the Good News of the gospel with them. Christmas Services will be on Sunday December 24th at 9:30am and 11:15am</p>
						<div>
							<a
								className='news-btn'
								style={{backgroundColor: themeColor}}
								href='https://www.facebook.com/events/132603337428667'
							>
								RVSP on Facebook
							</a>
						</div>
						<SectionSeparator/>
						<h1 className='news-title' style={{
							color: themeColor
						}}>Announcements</h1>
						<div className='news-html' dangerouslySetInnerHTML={{__html: news.announcements}}/>
					</div>
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
