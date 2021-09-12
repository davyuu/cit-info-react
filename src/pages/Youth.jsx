import React from 'react'
import moment from 'moment'
import AlertContainer from "react-alert";
import { RingLoader } from "react-spinners";

import Loading from '../components/Loading'
import HeaderBar from '../components/HeaderBar'
import FloatingButtons from '../components/FloatingButtons'
import * as colors from '../constants/colors'
import * as options from "../constants/options";
import strings from '../constants/strings';
import images from '../images/images';
import './Youth.scss'

const themeColor = colors.YOUTH_THEME;

class Youth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentService: 0,
      services: [],
      loading: false
    };
    this.goNextWeek = this.goNextWeek.bind(this);
    this.goPreviousWeek = this.goPreviousWeek.bind(this);
  }

  componentWillMount() {
    console.log('componentWillMount')
    let dataURL = 'https://mycit.info/wp-json/wp/v2/youthservices';
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

      let currentService = 0

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
    if (!services) {
      content = <Loading/>;
    } else {
      const service = services.length && services[currentService];
      content = (
        <div className="page-wrapper">
          {service.date && <p className='date'>{service.date.format('dddd MMMM DD, YYYY')}</p>}
          {service.outline && <div className='html' dangerouslySetInnerHTML={{__html: service.outline}}/>}
        </div>
      );
    }

    return (
      <div className="youth">
        <AlertContainer ref={a => (this.msg = a)} {...options.ALERT_OPTIONS} />
        <HeaderBar
          goBack={this.props.history.goBack}
          title={strings.youthHeader}
          color={themeColor}
        />
        <FloatingButtons
          leftClicked={this.goPreviousWeek}
          rightClicked={this.goNextWeek}
          leftClickable={!this.isLastWeek()}
          rightClickable={!this.isFirstWeek()}
        />
        <img className='header-img' src={images.youthHeader}/>
        {content}
        <div
          className="loading-spinner"
          style={{ visibility: this.state.loading ? "visible" : "hidden" }}
        >
          <RingLoader color={themeColor} loading={true} />
        </div>
      </div>
    )
  }
}

export default Youth
