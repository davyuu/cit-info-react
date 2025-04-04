import React from 'react'
import {version} from '../../package.json'
import routes from '../constants/routes'
import images from '../images/images'
import Section from '../components/Section'
import strings from '../constants/strings.js';
import './Home.scss'

const cityouthLink = 'https://instagram.com/cityouth_?utm_medium=copy_link'
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
        title={strings.messageHeader}
        image={images.message}
        linkTo={routes.message}
      />
      <hr/>
      <Section
        title={strings.kidsHeader}
        image={images.kids}
        linkTo={routes.kids}
      />
      <hr/>
      {/* <Section
        title={strings.youthHeader}
        image={images.youth}
        linkTo={cityouthLink}
        external
      />
      <hr/> */}
      <Section
        title={strings.connectHeader}
        image={images.connect}
        linkTo={routes.connect}
      />
      <hr/>
      <Section
        title={strings.alphaHeader}
        image={images.alpha}
        linkTo={routes.alpha}
      />
      <hr/>
      <Section
        title={strings.givingHeader}
        image={images.giving}
        linkTo={routes.giving}
      />
      <hr/>
      <Section
        title={strings.groupsHeader}
        image={images.groups}
        linkTo={communityGroupsLink}
        external
      />
      <hr/>
      <Section
        title={strings.prayerHeader}
        image={images.prayer}
        linkTo={routes.prayer}
      />
      {/* <hr/>
      <Section
        title="Gazebo Project"
        image={images.upcomingEvents}
        linkTo={routes.event}
      /> */}
      <hr/>
      <Section
        title={strings.eventsHeader}
        image={images.events}
        linkTo={routes.events}
      />
      {/* <hr/>
      <Section
        title={strings.nextHeader}
        image={images.nextSteps}
        linkTo={routes.next}
      />
      <hr/>
      <Section
        title={strings.volunteerHome}
        image={images.volunteer}
        linkTo={routes.volunteer}
      /> */}
    </div>
  </div>
);

export default Home
