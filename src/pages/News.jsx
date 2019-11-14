import React from 'react'
import moment from 'moment'
import Loading from '../components/Loading'
import HeaderBar from '../components/HeaderBar'
import FloatingButtons from '../components/FloatingButtons'
import * as colors from '../constants/colors'
import strings from '../constants/strings';
import './News.scss'

const UPCOMING = 0;
const PAST = 1;

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: UPCOMING,
      news: null,
      upcomingNews: [],
      pastNews: []
    };
    this.goUpcoming = this.goUpcoming.bind(this);
    this.goPast = this.goPast.bind(this);
  }

  componentWillMount() {
    let dataURL = 'https://mycit.info/wp-json/wp/v2/news';
    fetch(dataURL)
    .then(res => res.json())
    .then(res => {
      const news = res
        .map((val, i) => ({
          id: val.id,
          title: val.acf.title,
          image: val.acf.image,
          date: moment(val.acf.date, 'YYYY/MM/DD'),
          content: val.acf.content,
          isFeatured: val.acf.is_featured,
          linkLabel: val.acf.link_label,
          linkUrl: val.acf.link_url,
        }));

      const today = moment();
      const upcomingNews = news
        .filter(val => !val.date.isBefore(today))
        .sort((a, b) => b.isFeatured - a.isFeatured || a.date - b.date);
      const pastNews = news
      .filter(val => val.date.isBefore(today))
        .sort((a, b) => b.date - a.date);

      this.setState({
        news,
        upcomingNews,
        pastNews
      })
    })
  }

  goUpcoming() {
    if (this.isPast()) {
      this.setState({current: UPCOMING})
    }
  }

  goPast() {
    if (this.hasPast()) {
      this.setState({current: PAST})
    }
  }

  isPast() {
    return this.state.current === PAST;
  }

  hasPast() {
    return this.state.current === UPCOMING && this.state.pastNews.length > 0;
  }

  renderContent(news) {
    return (
      <div className='content'>
        {news.image &&
          <div className='header-container'>
            <img className='header-img' src={news.image}/>
          </div>
        }
        <div className='page-wrapper'>
          <h2 style={{color: colors.NEWS_THEME}}>{news.title}</h2>
          <p className='html' dangerouslySetInnerHTML={{__html: news.content}}/>
        </div>
      </div>
    )
  }

  render() {
    const {current, news, upcomingNews, pastNews} = this.state

    let content;
    if (news === null) {
      content = <Loading/>;
    } else if (news.length === 0) {
      content = (
        <div className='no-event'>
          <h2>{strings.newsSorry}</h2>
          <p>{strings.newsNoEvents}</p>
        </div>
      )
    } else {
      const currentNews = current === UPCOMING ? upcomingNews : pastNews;

      if (currentNews.length === 0) {
        content = (
          <div className='no-event'>
            <h2>{strings.newsSorry}</h2>
            <p>{strings.newsNoEvents}</p>
          </div>
        )
      } else {
        content = currentNews.map(currentNewsItem => (
          <div className='content-wrapper' key={currentNewsItem.id}>
            {currentNewsItem.image &&
              <img className='img' src={currentNewsItem.image}/>
            }
            <div className="content">
              <h2 style={{color: colors.NEWS_THEME}}>{currentNewsItem.title}</h2>
              <p className='html' dangerouslySetInnerHTML={{__html: currentNewsItem.content}}/>

              {currentNewsItem.linkUrl &&
                <a
                  className='button'
                  style={{backgroundColor: colors.NEWS_THEME}}
                  href={currentNewsItem.linkUrl}
                >{currentNewsItem.linkLabel}</a>
              }
            </div> 
          </div>
        ));
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
          leftClicked={this.goPast}
          rightClicked={this.goUpcoming}
          leftClickable={this.hasPast()}
          rightClickable={this.isPast()}
        />
        <div className="wrapper">
          {content}
        </div>
      </div>
    )
  }
}

export default News
