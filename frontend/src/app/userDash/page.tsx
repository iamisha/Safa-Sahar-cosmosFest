"use client";
import React, { useState } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";

const UserDash = () => {
	// State to track if the Dustbin Live Details card is clicked
	const [dustbinDetailsClicked, setDustbinDetailsClicked] = useState(false);

	// State to store the total number of full dustbins
	const [totalFullDustbins, setTotalFullDustbins] = useState(0);

	// Function to handle click on Dustbin Live Details card
	const handleDustbinDetailsClick = () => {
		const randomFullDustbins = Math.floor(Math.random() * 100);
		setTotalFullDustbins(randomFullDustbins);

		// Set the state to indicate that the card is clicked
		setDustbinDetailsClicked(!dustbinDetailsClicked);
	};

	return (
		<Box
			m="20px"
			sx={{
				height: "85vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				alignSelf: "flex-start",
			}}
		>
			<Typography variant="h4" gutterBottom>
				Welcome to Your Dashboard, User!
			</Typography>

			<Grid container spacing={3}>
				{/* Statistic Cards */}
				<Grid item xs={12} md={6} lg={4}>
					{/* Clickable Dustbin Live Details card */}
					<Paper
						elevation={3}
						sx={{
							p: 2,
							height: "100%",
							cursor: "pointer",
							transition: "transform 0.3s",
							"&:hover": {
								transform: "scale(1.05)", // Scale up on hover
							},
						}}
					>
						<Typography variant="h6" gutterBottom sx={{ color: "#87CEEB" }}>
							Email sent
						</Typography>
						<Typography variant="h6">234</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12} md={6} lg={4}>
					{/* Clickable Dustbin Live Details card */}
					<Paper
						elevation={3}
						sx={{
							p: 2,
							height: "100%",
							cursor: "pointer",
							transition: "transform 0.3s",
							"&:hover": {
								transform: "scale(1.05)", // Scale up on hover
							},
						}}
					>
						<Typography variant="h6" gutterBottom sx={{ color: "#87CEEB" }}>
							Visit Sites
						</Typography>
						<Typography variant="h6">235</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12} md={6} lg={4}>
					{/* Clickable Dustbin Live Details card */}
					<Paper
						elevation={3}
						sx={{
							p: 2,
							height: "100%",
							cursor: "pointer",
							transition: "transform 0.3s",
							"&:hover": {
								transform: "scale(1.05)", // Scale up on hover
							},
						}}
						onClick={handleDustbinDetailsClick}
					>
						<Typography variant="h6" gutterBottom sx={{ color: "#87CEEB" }}>
							Dustbin Live Details
						</Typography>
					</Paper>
				</Grid>

				{/* Render Total Full Dustbins card in the next row below Dustbin Live Details card when clicked */}
				{dustbinDetailsClicked && (
					<Grid item xs={12}>
						<Paper
							elevation={3}
							sx={{ p: 2, height: "100%", width: "50%", margin: "auto" }}
						>
							{/* Adjust the width and margin as needed */}
							<Typography
								variant="h6"
								gutterBottom
								sx={{ color: "#87CEEB", textAlign: "center" }}
							>
								Dustbin Details
							</Typography>
							<Typography variant="h6" sx={{ textAlign: "center" }}>
								Total Empty: {totalFullDustbins}
							</Typography>
							<Typography variant="h6" sx={{ textAlign: "center" }}>
								Total filled: 8
							</Typography>
						</Paper>
					</Grid>
				)}

				{/* Add more statistic cards as needed */}
			</Grid>
		</Box>
	);
};

export default UserDash;
