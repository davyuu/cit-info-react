import React from 'react'
import Select from 'react-select'
import AlertContainer from 'react-alert'
import {RingLoader} from 'react-spinners'
import moment from 'moment'

import HeaderBar from '../components/HeaderBar'
import TitleSection from '../components/TitleSection'
import routes from '../constants/routes'
import strings from '../constants/strings'
import images from '../images/images'
import * as options from '../constants/options'
import * as colors from '../constants/colors'
import Loading from '../components/Loading'
import * as NetworkUtils from '../utils/NetworkUtils'
import * as Utils from '../utils/Utils'

import 'react-select/dist/react-select.css'
import './Stats.scss'


class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: null,
      search: ''
    }

    this.weeklySchedule = this.weeklySchedule.bind(this);
  };

  componentWillMount() {
    let confirmedURL = 'https://cit-stats.herokuapp.com/services/confirmed';
    let confirmedPromise = fetch(confirmedURL)
      .then(res => res.json())
      .then(res => {

        return res
          .map((val, i) => ({
            people: val.people,
            type: val.type,
            createdAt: val.createdAt,
            updatedAt: val.updatedAt
          }));
      })


    let declinedURL = 'https://cit-stats.herokuapp.com/services/declined';
    let declinedPromise = fetch(declinedURL)
      .then(res => res.json())
      .then(res => {

        return res
          .map((val, i) => ({
            people: val.people,
            type: val.type,
            createdAt: val.createdAt,
            updatedAt: val.updatedAt
          }));

      })
    

    Promise.all([confirmedPromise, declinedPromise]).then(values => {
      //console.log(values);
      let confirmed = values[0];
      let declined = values[1];
      this.weeklySchedule(values);
      

      // this.setState({
      //   confirmed: values[0],
      //   declined: values[1],
      // });
    });

  }

  weeklySchedule(values) {
    let weekly = []
    let confirmed = values[0]
    let declined = values[1]
    // returning daily data to weekly
    for (var i = 0; i<confirmed.length; i=i+7) {
      weekly.push(confirmed[i])
    }

    for (var i = 0; i<declined.length; i=i+7) {
        weekly.push(declined[i])
    }

    // returning schedule by volunteer ID
    var data = []
    let volunteers = {}

    for (var ind = 0; ind<weekly.length; ind++) {
      data = weekly[ind]

      for (var index = 0, l = data['people'].length; index < l; index++) {
        var obj = data['people'][index];

          if (!(obj['_id'] in volunteers)) {

            volunteers[obj['_id']] = {
              'name': obj['name'],
              'schedule': [{
                 'updatedAt': data['updatedAt'],
                 'type': data['type']
              }]
            }
          }
        volunteers[obj['_id']]['schedule'].push({
          'updatedAt': data['updatedAt'],
          'type': data['type']
        })
      }
    }
    //console.log('volunteers function')
    //console.log(volunteers)


    // sorting schedule by updatedAt timestamp

    for (var key of Object.keys(volunteers)) {
      volunteers[key]['schedule'].sort(function(a,b){
        var aTimeStamp = (new Date(a['updatedAt']).getTime()/1000)
        var bTimeStamp = (new Date(b['updatedAt']).getTime()/1000)
        return bTimeStamp - aTimeStamp;
      })
    }

    var myCount = {} // myCount of # of declines per person
    var person = [] // each person in my object of volunteers

    // returning volunteers and # of declines in their last 4 sessions
    for (var key of Object.keys(volunteers)) {
    person = volunteers[key]

      //excluding volunteers who have not volunteered at least 4 times
      if(person.schedule.length > 3) {
        if(!(key in myCount)) {
          myCount[key] = 0;
        }

        for (var iKey = 0; iKey < 4; iKey++) {

          if(person['schedule'][iKey]['type'] === 'DECLINED')
            myCount[key] += 1;
        }
      }
    }
    //console.log('myCount:', myCount);


    // return list of volunteers who declined 3 times out of last 4
    let final = []

    for (var key of Object.keys(myCount)) {
      if((!(myCount[key]===0)) && myCount[key]>2) {
        const test = {
          name: volunteers[key].name,
          //returning only the 3 most recent declined dates
          dates: volunteers[key].schedule.filter(s => s.type === 'DECLINED').splice(0,3)
        }
        final.push(test);
      }
    }
    //console.log('final:', final)

    this.setState({
      ...this.state,
      schedules: final
    });
  }

  //searching for volunteer names in table
  searchVolunteers() {

    var input, filter, table, tr, td, i, txtValue;
    table = document.getElementById("myTable");
    tr = document.getElementsByTagName("tr");
    input = document.getElementById("myInput")
    filter = this.state.search.toUpperCase();
    
    //filtering table based on characters inputted in search in real-time
    if(this.state.search != null) {
      for (var char = 0; char < tr.length; char++) {
        td = tr[char].getElementsByTagName("td")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[char].style.display = "";
          } else {
            tr[char].style.display = "none";
          }
        }
      }
    }
  }



  render() {

    let content;
    const {schedules} = this.state
    if (schedules === null) {
      content = (<Loading/>);
    } else {

      content = (
        <div className='stats'>
          {/* <AlertContainer ref={a => this.msg = a} {...options.ALERT_OPTIONS} /> */}
          <div className='page-wrapper'>
            <TitleSection
              title={strings.statsTitle}
              description={strings.statsDescription}
            />
            <div>
              {/* <div> */}
                <input type="text" 
                id="myInput"
                placeholder="Search a name..."
                name="search"
                value={this.state.search}
                onInput={(e) => {
                  this.setState({search: e.currentTarget.value})
                  //console.log(e.currentTarget.value)
                }}
              />
              {/* calling search function */}
              {this.searchVolunteers()}
              {/* </div> */}
              <table className='Volunteers' id="myTable">
                <thead>
                  <tr>
                    <th>Volunteer Name</th>
                    <th>Declined 3</th>
                    <th>Declined 2</th>
                    <th>Declined 1</th>
                  </tr>
                </thead>
                {this.state.schedules.map((val, i) => {
                  return (
                    <tbody key={i}>
                      <tr>
                        <td>{val.name}</td>
                        {val.dates.map((date, dateindex) => {
                          return (
                            <td key={dateindex}>
                              {moment(date['updatedAt']).format("MMM D, YYYY")}
                            </td>
                          )
                        })}
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <HeaderBar
          goBack={this.props.history.goBack}
          title={strings.statsHeader}
          color={colors.STATS_THEME}
        />
        {content}
        {/* {modal} */}
      </div>
    )
  } 
}


export default Stats
