import React from 'react'
import {version} from '../../package.json'
import images from '../images/images'
import Pages from '../components/Pages'
import Section from '../components/Section'
import sections from '../constants/sections';
import './Home.scss'

class Home extends React.Component {
  render() {
    return (
      <div className='home'>
        <span className="version-number">{version}</span>
        <div className='header'>
          <div className='banner-img' dangerouslySetInnerHTML={{__html: images.banner}} />
          <div className='logo-img' dangerouslySetInnerHTML={{__html: images.logo}} />
        </div>
        <div className='content'>
          {sections.map((section, i) =>
            section.active && <Section
              className="section"
              key={i}
              title={section.title}
              image={section.image}
              linkTo={section.linkTo}
              external={section.external}
            />
          )}
          <Pages />
        </div>
      </div>
    )
  }
};

export default Home
