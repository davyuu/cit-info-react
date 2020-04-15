import React from 'react'
import AlertContainer from 'react-alert'
import moment from 'moment'
import HeaderBar from '../components/HeaderBar'
import TitleSection from '../components/TitleSection'
import strings from '../constants/strings'
import * as colors from '../constants/colors'
import Loading from '../components/Loading'
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
      let volunteers = this.weeklySchedule(values);
      this.badEggs(volunteers);

    });

  }

  weeklySchedule(values) {
    let schedule = []
    let confirmed = values[0]
    let declined = values[1]
    // returning daily data to weekly
    for (var i = 0; i<confirmed.length; i=i+7) {
      schedule.push(confirmed[i])
    }

    for (var i = 0; i<declined.length; i=i+7) {
      schedule.push(declined[i])
    }

    // returning schedule by volunteer ID
    let volunteers = {}

    schedule.forEach(data => {

      data.people.forEach(obj => {
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
      })
    })

    // sorting schedule by updatedAt timestamp
    for (var key of Object.keys(volunteers)) {
      volunteers[key]['schedule'].sort((a,b) => {
        var aTimeStamp = (new Date(a['updatedAt']).getTime()/1000)
        var bTimeStamp = (new Date(b['updatedAt']).getTime()/1000)
        return bTimeStamp - aTimeStamp;
      })
    }
    return volunteers;
  }

  badEggs(volunteers) {
    console.log('volunteers',volunteers)

    var myCount = {} // myCount of # of declines per person
    var person = [] // each person in my object of volunteers

    // returning volunteers and # of declines in their last 4 sessions
    
    for (var key of Object.keys(volunteers)) {
    person = volunteers[key]
    
      const lastFourServices = person.schedule.slice(0,4)
      const numDeclines = lastFourServices.filter(service => service.type === 'DECLINED').length

      if(!(key in myCount)) {
        myCount[key] = numDeclines
      }
    }

    // return list of volunteers who declined 3 times out of last 4
    let final = []

    for (var key of Object.keys(myCount)) {
      if((!(myCount[key]===0)) && myCount[key]>2) {
        const test = {
          name: volunteers[key].name,
          //returning only the 3 most recent declined dates
          dates: volunteers[key].schedule.filter(s => s.type === 'DECLINED').slice(0,3)
        }
        final.push(test);
      }
    }
    
    //need to add code to sort volunteer names alphabetically

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
          <div className='page-wrapper'>
            {/* <TitleSection
              title={strings.statsTitle}
              description={strings.statsDescription}
            /> */}
            <div>
              <input type="text" 
              id="myInput"
              placeholder="Search a name..."
              name="search"
              value={this.state.search}
              onInput={(e) => {
                this.setState({search: e.currentTarget.value})
              }}
              />
              {/* calling search function */}
              {this.searchVolunteers()}
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
          // goBack={this.props.history.goBack}
          title={strings.statsHeader}
          color={colors.STATS_THEME}
        />
        {content}
      </div>
    )
  } 
}


export default Stats
