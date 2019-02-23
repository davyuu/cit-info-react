import React from 'react'
import Loading from '../components/Loading'
import HeaderBar from '../components/HeaderBar'
import FloatingButtons from '../components/FloatingButtons'
import * as colors from '../constants/colors'
import images from '../images/images'
import strings from '../constants/strings';
import './News.scss'

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNews: 0,
      news: []
    };
    this.goNextWeek = this.goNextWeek.bind(this);
    this.goPreviousWeek = this.goPreviousWeek.bind(this);
  }

  componentWillMount() {
    let dataURL = 'https://mycit.info/wp-json/wp/v2/news';
    fetch(dataURL)
    .then(res => res.json())
    .then(res => {
      this.setState({
        news: res.map(val => {
          const item = val.acf;
          return {
            title: item.title,
            image: item.image,
            featured: item.featured,
            linkLabel: item.link_label,
            linkUrl: item.link_url,
            announcements: item.announcements
          };
        })
      })
    })
  }

  goNextWeek() {
    const currentNews = this.state.currentNews;
    if(!this.isFirstWeek()) {
      this.setState({currentNews: currentNews - 1})
    }
  }

  goPreviousWeek() {
    const currentNews = this.state.currentNews;
    if(!this.isLastWeek()) {
      this.setState({currentNews: currentNews + 1})
    }
  }

  isFirstWeek() {
    return this.state.currentNews === 0;
  }

  isLastWeek() {
    return this.state.currentNews >= this.state.news.length - 1;
  }

  render() {
    let content;
    if (this.state.news.length === 0) {
      content = <Loading/>;
    } else {
      const news = this.state.news[this.state.currentNews];

      let announcements;
      if (news.announcements) {
        announcements = (
          <div>
            <hr/>
            <div className="announcements">
              <h2 style={{color: colors.NEWS_THEME}}>Announcements</h2>
              <div className='html' dangerouslySetInnerHTML={{__html: news.announcements}}/>
            </div>
          </div>
        )
      }

      let link;
      if (news.linkLabel && news.linkUrl) {
        link = (
          <div>
            <a
              className='button'
              style={{backgroundColor: colors.NEWS_THEME}}
              href={news.linkUrl}
            >
              {news.linkLabel}
            </a>
          </div>
        )
      }

      content = (
        <div className='content'>
          <div className='header-container'>
            <img className='header-img' src={news.image}/>
          </div>
          <div className='page-wrapper'>
            <h2 style={{color: colors.NEWS_THEME}}>{news.title}</h2>
            <p className='html' dangerouslySetInnerHTML={{__html: news.featured}}/>
            {link}
            {announcements}
          </div>
        </div>
      )
    }

    return (
      <div className='news'>
        <HeaderBar
          goBack={this.props.history.goBack}
          title={strings.newsHeader}
          color={colors.NEWS_THEME}
        />
        <FloatingButtons
          leftClicked={this.goPreviousWeek}
          rightClicked={this.goNextWeek}
          leftClickable={!this.isLastWeek()}
          rightClickable={!this.isFirstWeek()}
        />
        {content}
      </div>
    )
  }
}

export default News
