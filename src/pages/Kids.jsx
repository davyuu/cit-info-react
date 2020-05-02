import React from 'react'
import moment from 'moment'
import Loading from '../components/Loading'
import HeaderBar from '../components/HeaderBar'
import FloatingButtons from '../components/FloatingButtons'
import * as colors from '../constants/colors'
import strings from '../constants/strings';
import images from '../images/images';
import './Kids.scss'

const themeColor = colors.KIDS_THEME;

class Kids extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentService: 0,
      services: null
    };
    this.goNextWeek = this.goNextWeek.bind(this);
    this.goPreviousWeek = this.goPreviousWeek.bind(this);
  }

  componentWillMount() {
    let dataURL = 'https://mycit.info/wp-json/wp/v2/childrenservices';
    fetch(dataURL)
    .then(res => res.json())
    .then(res => {
      const services = res.map(val => {
        const service = val.acf;

        return {
          date: moment(service.date, 'YYYY/MM/DD'),
          outline: service.outline,
          intro: service.intro,
          preschoolLessonVimeoId: service.preschool_lesson_vimeo_id,
          elementaryLessonVimeoId: service.elementary_lesson_vimeo_id,
          preschoolPlaylistYoutubeId: service.preschool_playlist_youtube_id,
          elementaryPlaylistYoutubeId: service.elementary_playlist_youtube_id,
          devotionalSkgrade1: service.devotional_skgrade_1,
          devotionalGrade23: service.devotional_grade_2_3,
          devotionalGrade45: service.devotional_grade_4_5,
        };
      })
      
      let past = false
      let currentService = 0
      services.forEach((service, i) => {
        if (!past && service.date) {
          const today = new Date()
          const date = new Date(service.date)
          if (date < today) {
            past = true
            currentService = i
          }
        }
      })

      this.setState({
        services,
        currentService
      })
    })
  }

  goNextWeek() {
    const currentService = this.state.currentService;
    if(!this.isFirstWeek()) {
      this.setState({currentService: currentService - 1})
    }
  }

  goPreviousWeek() {
    const currentService = this.state.currentService;
    if(!this.isLastWeek()) {
      this.setState({currentService: currentService + 1})
    }
  }

  isFirstWeek() {
    return this.state.currentService === 0;
  }

  isLastWeek() {
    const {currentService, services} = this.state
    return services && currentService >= services.length - 1;
  }

  render() {
    const {services, currentService} = this.state

    let content;
    if (services === null) {
      content = <Loading/>;
    } else {
      const service = services[currentService];
      let outline;
      if (service.outline) {
        outline = <div className='html' dangerouslySetInnerHTML={{__html: service.outline}}/>
      } else {
        outline = (
          <div className="content">
            <div className='html' dangerouslySetInnerHTML={{__html: service.intro}}/>
            <p>What you can do:</p>
            <ol>
              <li>
                <p>Download the free <a href="https://theparentcue.org/app" target="_blank" rel="noopener">Parent Cue</a> app on the App Store or Google Play. When it asks for church name, type “Church in Toronto” (not CIT).</p>
                <p>Highlights of this app include:</p>
                <ul>
                    <li>Weekly videos of the Bible stories that we have been going through</li>
                    <li>Weekly cues to help make the most of your time together</li>
                </ul>
              </li>
              <li>Engage your kids in this week’s Bible story
                <p>Preschool: <a href={`https://vimeo.com/${service.preschoolLessonVimeoId}`} target="_blank" rel="noopener">https://vimeo.com/{service.preschoolLessonVimeoId}</a></p>
                <p>Elementary: <a href={`https://vimeo.com/${service.elementaryLessonVimeoId}`} target="_blank" rel="noopener">https://vimeo.com/{service.elementaryLessonVimeoId}</a></p>
              </li>
              <li>Sing along to these worship songs throughout the week
                <p>Preschool:</p>
                <div className="video">
                  <iframe src={`https://www.youtube.com/embed/videoseries?list=${service.preschoolPlaylistYoutubeId}`}></iframe>
                </div>
                <p>Elementary:</p>
                <div className="video">
                  <iframe src={`https://www.youtube.com/embed/videoseries?list=${service.elementaryPlaylistYoutubeId}`}></iframe>
                </div>
              </li>
              <li>Encourage your kids to follow this week’s God Time card, a take-home devotional:
                <ul>
                  <li><a href={service.devotionalSkgrade1} target="_blank" rel="noopener">God Time Card SK Grade 1</a></li>
                  <li><a href={service.devotionalGrade23} target="_blank" rel="noopener">God Time Card Grade 2-3</a></li>
                  <li><a href={service.devotionalGrade45} target="_blank" rel="noopener">God Time Card Grade 4-5</a></li>
                </ul>
              </li>
            </ol>
          </div>
        )
      }
      content = (
        <div className="page-wrapper">
          <p className='date'>{service.date.format('dddd MMMM DD, YYYY')}</p>
          {outline}
        </div>
      );
    }

    return (
      <div className="kids">
        <HeaderBar
          goBack={this.props.history.goBack}
          title={strings.kidsHeader}
          color={themeColor}
        />
        <FloatingButtons
          leftClicked={this.goPreviousWeek}
          rightClicked={this.goNextWeek}
          leftClickable={!this.isLastWeek()}
          rightClickable={!this.isFirstWeek()}
        />
        <img className='header-img' src={images.kidsHeader}/>
        {content}
      </div>
    )
  }
}

export default Kids
