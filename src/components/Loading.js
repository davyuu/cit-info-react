import React from 'react'

const Loading = () => (
	<div style={styles.container}>
		<h1 style={styles.text}>LOADING...</h1>
	</div>
);

const styles = {
	container: {

	},
	text: {
		textAlign: 'center',
		marginTop: 200,
		fontSize: 36,
		fontWeight: '700',
	}
}

export default Loading
