import React from 'react'
import routes from './../routes/routes';
import images from './../images/images';
import Section from './../components/Section';
import './Home.css';

const Home = () => (
	<div className="Home">
		<header className="Home-header">
			<h1 className="Home-title">cit</h1>
		</header>
		<Section
			title={"Latest Message"}
			image={images.icMicBlack}
			linkTo={routes.message}
		/>
		<Section
			title={"What's Happening"}
			image={images.icMicBlack}
			linkTo={routes.news}
		/>
		<Section
			title={"Giving"}
			image={images.icMicBlack}
			linkTo={routes.giving}
		/>
		<Section
			title={"Community Groups"}
			image={images.icMicBlack}
			linkTo={routes.groups}
		/>
		<Section
			title={"Get Connected"}
			image={images.icMicBlack}
			linkTo={routes.connect}
		/>
	</div>
);

export default Home
