import React from 'react'
import moment from 'moment'
import HeaderBar from '../components/HeaderBar'
import TitleSection from '../components/TitleSection'
import FloatingButtons from '../components/FloatingButtons'
import * as colors from '../constants/colors'
import strings from '../constants/strings';
import routes from '../constants/routes'

import './Stats.scss'


class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: []
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
      console.log(values);
      let confirmed = values[0];
      let declined = values[1];
      this.weeklySchedule(values)

      this.setState({
        confirmed: values[0],
        declined: values[1],
      });
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
    console.log('volunteers function')
    console.log(volunteers)
    

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
      if(person['schedule'].length > 3) {
        if(!(person['name'] in myCount)) {
          myCount[person['name']] = 0;
        }
        
        for (var iKey = 0; iKey < 4; iKey++) {

          if(person['schedule'][iKey]['type'] === 'DECLINED')
            myCount[person['name']] += 1;
        }
      }
    }
    console.log(myCount);


    // return list of volunteers who declined 3 times out of last 4
    let final = []
    
    for (var name of Object.keys(myCount)) {
      if((!(myCount[name]===0)) && myCount[name]>2) {
        final.push(name);
      }
    }
    console.log(final)

  }
  

  render() {

    return <div>
      {final.toString()}
    </div>

    // return <div><table>
    //   {this.state.schedules.map((val, i) => {
    //     return (
    //       <tbody key={i}>
    //         <tr>
    //           <td>{JSON.stringify(val.people)}</td>
    //           <td>{val.type}</td>
    //           <td>{val.createdAt}</td>
    //           <td>{val.updatedAt}</td>
    //         </tr>
    //       </tbody>
    //     );
    //   })}</table></div>
  }
}


export default Stats
