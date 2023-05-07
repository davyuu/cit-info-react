import React from 'react'
import {version} from '../../package.json'
import routes from '../constants/routes'
import images from '../images/images'
import Section from '../components/Section'
import strings from '../constants/strings.js';
import './Home.scss'

const surveyLink = 'https://gael-chsol.appspot.com/sve/htm/chsol-gather.htm?ns=cit'
const cityouthLink = 'https://instagram.com/cityouth_?utm_medium=copy_link'
const communityGroupsLink = 'https://churchintoronto.churchcenter.com/groups/community-groups'
const christmasMarketLink = 'https://docs.google.com/forms/d/e/1FAIpQLSfVLDNCNRgu2k2_682AObMMbYx2C28ETjdz0hxe1RIFsTokmg/viewform'
const womensEventLink = 'https://docs.google.com/forms/d/e/1FAIpQLSfYWnnAOn3OOxBWUmxug6jJHy6dwbvVZsPAA1dzX357ccA34Q/viewform'
const blessingBagsLink = 'https://docs.google.com/document/d/1-OjlRqhWLl-PiPrujwYtTqTxs8lL8FeOeXU1z1j9rRI/edit'

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
      <Section
        title={strings.youthHeader}
        image={images.youth}
        linkTo={cityouthLink}
        external
      />
      <hr/>
      <Section
        title={strings.connectHeader}
        image={images.connect}
        linkTo={routes.connect}
      />
      {/* <hr/> */}
      {/* <Section
        title={strings.christmasHeader}
        image={images.gift}
        linkTo={routes.christmas}
      /> */}
      {/* <Section
        title={strings.alphaHeader}
        image={images.alpha}
        linkTo={routes.alpha}
      /> */}
      {/* <hr/>
      <Section
        title="The Marriage Course"
        image={images.marriage}
        linkTo={routes.marriage}
      /> */}
      {/* <hr/>
      <Section
        title="Christmas Market"
        image={images.gift}
        linkTo={christmasMarketLink}
        external
      /> */}
      <hr/>
      <Section
        title={strings.givingHeader}
        image={images.giving}
        linkTo={routes.giving}
      />
      {/* <hr/>
      <Section
        title="Refugee Support"
        image={images.handshake}
        linkTo={routes.support}
      /> */}
      <hr/>
      <Section
        title="Women's Event - June 24"
        image={images.woman}
        linkTo={womensEventLink}
        external
      />
      <hr/>
      <Section
        title="Blessing Bags for Scott Mission"
        image={images.bag}
        linkTo={blessingBagsLink}
        external
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
        title={strings.newsHeader}
        image={images.upcomingEvents}
        linkTo={routes.news}
      />
      <hr/>
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
