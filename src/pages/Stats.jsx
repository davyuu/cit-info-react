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
    };

  componentWillMount() {
    let dataURL = 'https://cit-stats.herokuapp.com/services/confirmed';
    fetch(dataURL)
    .then(res => res.json())
    .then(res => {
//      console.log(res)

     const schedules = res
         .map((val, i) => ({
           people: val.people,
           type: val.type,
           createdAt: val.createdAt,
           updatedAt: val.updatedAt
         }));
     this.setState({
       schedules
     })
    })

  }

    render() {
      return <div><table>
        {this.state.schedules.map((val, i) => {
          return (
          <tbody key={i}>
            <tr>
              <td>{JSON.stringify(val.people)}</td>
              <td>{val.type}</td>
              <td>{val.createdAt}</td>
              <td>{val.updatedAt}</td>
            </tr>
          </tbody>
          );
        })}</table></div>
    }
}


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
//}

export default Stats
