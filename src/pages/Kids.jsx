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
      content = (
        <div className="page-wrapper">
          <p className='date'>{service.date.format('dddd MMMM DD, YYYY')}</p>
          <div className='html' dangerouslySetInnerHTML={{__html: service.outline}}/>
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
