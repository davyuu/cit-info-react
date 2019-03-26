import React from 'react'
import moment from 'moment'
import Loading from '../components/Loading'
import HeaderBar from '../components/HeaderBar'
import FloatingButtons from '../components/FloatingButtons'
import * as colors from '../constants/colors'
import strings from '../constants/strings';
import './News.scss'

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      news: null
    };
    this.goNextWeek = this.goNextWeek.bind(this);
    this.goPreviousWeek = this.goPreviousWeek.bind(this);
  }

  componentWillMount() {
    let dataURL = 'https://mycit.info/wp-json/wp/v2/news';
    fetch(dataURL)
    .then(res => res.json())
    .then(res => {
      const news = res.map((val, i) => {
        const item = val.acf;
        return {
          title: item.title,
          image: item.image,
          date: moment(item.date, 'YYYY/MM/DD'),
          featured: item.featured,
          linkLabel: item.link_label,
          linkUrl: item.link_url,
          announcements: item.announcements
        };
      })

      let currentIndex = -1
      news.forEach((item, i) => {
        if (item.date) {
          const today = new Date()
          const date = new Date(item.date)
          if (today < date) {
            currentIndex = i
          }
        }
      })

      if (currentIndex === -1) {
        currentIndex = 0
        news.unshift({
          empty: true
        })
      }

      this.setState({
        news,
        currentIndex
      })
    })
  }

  goNextWeek() {
    const currentIndex = this.state.currentIndex;
    if(!this.isFirstWeek()) {
      this.setState({currentIndex: currentIndex - 1})
    }
  }

  goPreviousWeek() {
    const currentIndex = this.state.currentIndex;
    if(!this.isLastWeek()) {
      this.setState({currentIndex: currentIndex + 1})
    }
  }

  isFirstWeek() {
    return this.state.currentIndex === 0;
  }

  isLastWeek() {
    const {currentIndex, news} = this.state
    return news && currentIndex >= news.length - 1;
  }

  render() {
    const {currentIndex, news} = this.state

    let content;
    if (news === null) {
      content = <Loading/>;
    } else {
      const currentNews = news[currentIndex];

      if (currentNews.empty) {
        content = (
          <div className='no-event'>
            <h2>{strings.newsSorry}</h2>
            <p>{strings.newsNoEvents}</p>
          </div>
        )
      } else {
        let image;
        if (currentNews.image) {
          image = (
            <div className='header-container'>
              <img className='header-img' src={currentNews.image}/>
            </div>
          )
        }

        let announcements;
        if (currentNews.announcements) {
          announcements = (
            <div>
              <hr/>
              <div className="announcements">
                <h2 style={{color: colors.NEWS_THEME}}>Announcements</h2>
                <div className='html' dangerouslySetInnerHTML={{__html: currentNews.announcements}}/>
              </div>
            </div>
          )
        }

        let link;
        if (currentNews.linkLabel && currentNews.linkUrl) {
          link = (
            <div>
              <a
                className='button'
                style={{backgroundColor: colors.NEWS_THEME}}
                href={currentNews.linkUrl}
              >
                {currentNews.linkLabel}
              </a>
            </div>
          )
        }

        content = (
          <div className='content'>
            {image}
            <div className='page-wrapper'>
              <h2 style={{color: colors.NEWS_THEME}}>{currentNews.title}</h2>
              <p className='html' dangerouslySetInnerHTML={{__html: currentNews.featured}}/>
              {link}
              {announcements}
            </div>
          </div>
        )
      }
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
