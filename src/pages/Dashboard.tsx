import React from 'react';
import {Stack, Text} from "../components";

const Dashboard = () => {
	return (
		<Stack fullHeight justify="center" align="center"  style={{ minHeight: "calc(100vh - 98px - 25px)" }}>
			<h1 style={{ fontSize: '56px', color: 'white' }}>Dashboard</h1>
		</Stack>
	);
};

export default Dashboard;
