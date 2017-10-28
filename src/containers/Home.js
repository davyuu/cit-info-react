import React from 'react'
import routes from './../routes/routes';
import images from './../images/images';
import Section from './../components/Section';
import SectionSeparator from './../components/SectionSeparator';
import './Home.css';

const Home = () => (
	<div className="Home">
		<header className="Home-header">
			<div className="Home-title-container">
				<h1 className="Home-title">cit</h1>
			</div>
		</header>
		<Section
			title={"Latest Message"}
			image={images.messages}
			linkTo={routes.message}
		/>
		<SectionSeparator/>
		{/*<Section
			title={"What's Happening"}
			image={images.whatsHappening}
			linkTo={routes.news}
		/>*/}
		<Section
			title={"Giving"}
			image={images.giving}
			linkTo={routes.giving}
		/>
		<SectionSeparator/>
		{/*<Section
			title={"Community Groups"}
			image={images.giving}
			linkTo={routes.groups}
		/>*/}
		<Section
			title={"Get Connected"}
			image={images.giving}
			linkTo={routes.connect}
		/>
	</div>
);

export default Home
