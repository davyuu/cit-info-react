import React from 'react'
import routes from './../routes/routes';
import images from './../images/images';
import Section from './../components/Section';
import SectionSeparator from './../components/SectionSeparator';
import './Home.css';

const Home = () => (
	<div className='home'>
		<header className='home-header'>
			<div className='home-title-container'>
				<h1 className='home-title'>cit</h1>
			</div>
		</header>
		<div className='home-content'>
			<Section
				title={'Latest Message'}
				image={images.messages}
				linkTo={routes.message}
			/>
			<SectionSeparator/>
			{/*<Section
				title={'What's Happening'}
				image={images.whatsHappening}
				linkTo={routes.news}
			/>*/}
			<Section
				title={'Giving'}
				image={images.giving}
				linkTo={routes.giving}
			/>
			<SectionSeparator/>
			{/*<Section
				title={'Community Groups'}
				image={images.giving}
				linkTo={routes.groups}
			/>*/}
			<Section
				title={'Get Connected'}
				image={images.connect}
				linkTo={routes.connect}
			/>
		</div>
	</div>
);

export default Home
