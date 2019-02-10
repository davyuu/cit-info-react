import React from 'react'
import {version} from '../../package.json'
import routes from '../constants/routes'
import images from '../images/images'
import Section from '../components/Section'
import './Home.scss'

const communityGroupsLink = 'https://churchintoronto.churchcenter.com/groups/community-groups'
const Home = () => (
  <div className='home'>
    <span className="version-number">{version}</span>
    <div className='header'>
      <div className='banner-img' dangerouslySetInnerHTML={{__html: images.banner}} />
      <div className='logo-img' dangerouslySetInnerHTML={{__html: images.logo}} />
    </div>
    <div className='content'>
      <Section
        title={'Latest Message'}
        image={images.message}
        linkTo={routes.message}
      />
      {/* <hr/>
      <Section
        title={'What\'s Happening'}
        image={images.whatsHappening}
        linkTo={routes.news}
      /> */}
      <hr/>
      <Section
        title={'Connect'}
        image={images.connect}
        linkTo={routes.connect}
      />
      <hr/>
      <Section
        title={'Next Steps'}
        image={images.nextSteps}
        linkTo={routes.next}
      />
      <hr/>
      <Section
        title={'Giving'}
        image={images.giving}
        linkTo={routes.giving}
      />
      <hr/>
      <Section
        title={'Community Groups'}
        image={images.groups}
        linkTo={communityGroupsLink}
        external
      />
      <hr/>
      <Section
        title={'Join a Team'}
        image={images.volunteer}
        linkTo={routes.volunteer}
      />
    </div>
  </div>
);

export default Home
