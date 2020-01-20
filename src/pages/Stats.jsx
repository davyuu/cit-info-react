import React from 'react'
import HeaderBar from '../components/HeaderBar'
import TitleSection from '../components/TitleSection'
import FloatingButtons from '../components/FloatingButtons'
import routes from '../constants/routes'

import './Stats.scss'

class Stats extends React.Component {

  componentWillMount() {
    let dataURL = 'https://cit-stats.herokuapp.com/services/confirmed';
    return fetch(dataURL)
    .then(res => res.json())
    .then(res => {
      console.log(res)
  //    const schedule = res.map(val => {
  //      const schedule = val.acf;
  //      return {
  //        people: schedule.people,
  //        type: schedule.type,
  //        createdAt: schedule.createdAt,
  //        updatedAt: schedule.updatedAt
  //      };
  //    })
    })
  }
}
//  render() {
//    content = 'text'
//  }

//  content = (
//    <div className='stats-content'>
//      <div className='stats-header-container'>
//         </div>
//
//       </div>
//       {tabContent}
//     </div>
//   )
//
// }



export default Stats
