import React from 'react'
import routes from '../constants/routes'
import images from '../images/images'
import Section from '../components/Section'
import SectionSeparator from '../components/SectionSeparator'
import './Home.css'

const communityGroupsLink = 'https://churchintoronto.churchcenter.com/groups/community-groups'
const Home = () => (
  <div className='home'>
    <div className='home-header'>
      <div className='home-title-container-img' dangerouslySetInnerHTML={{__html: images.banner}} />
      <div className='home-title-logo-img' dangerouslySetInnerHTML={{__html: images.logo}} />
    </div>
    <div className='home-content'>
      <Section
        title={'Latest Message'}
        image={images.message}
        linkTo={routes.message}
      />
      {/* <SectionSeparator/>
        <Section
        title={'What\'s Happening'}
        image={images.whatsHappening}
        linkTo={routes.news}
      /> */}
      <SectionSeparator/>
      <Section
        title={'Giving'}
        image={images.giving}
        linkTo={routes.giving}
      />
      <SectionSeparator/>
      <Section
        title={'Community Groups'}
        image={images.groups}
        linkTo={communityGroupsLink}
        external
      />
      <SectionSeparator/>
      <Section
        title={'Connect'}
        image={images.connect}
        linkTo={routes.connect}
      />
    </div>
  </div>
);

export default Home
