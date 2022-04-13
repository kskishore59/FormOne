import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import IPageProps from "../interfaces/page";
import { Step1, steps, updateDetails } from "../store/rootSlice";
import { AppDispatch, RootState } from "../store/store";
import { Stepper } from "../components/StepperComponent/Stepper";
import Navbar from "./Navbar";
import { ControllerTexFieldComp } from "../components/formFields/TextFieldController";
import StepperComponent from "../components/StepperComponent/StepperComponent";

const HomePage: React.FunctionComponent<IPageProps> = (props) => {
	const dispatch: AppDispatch = useDispatch();
	const details = useSelector((state: RootState) => state);
	const { firstName, lastName } = details.yourDetails;
	const { email } = details.auth;
	const validationSchema = Yup.object().shape({
		firstName: Yup.string().required("First Name is required"),
		lastName: Yup.string().required("Last Name is required"),
	});

	const { handleSubmit, control } = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: { firstName, lastName },
	});

	const history = useNavigate();

	const onSubmit: SubmitHandler<Step1> = (data) => {
		console.log(data);
		dispatch(updateDetails(data));
		dispatch(steps({ stepOne: true }));
		console.log(details);
		history("/step2");
	};
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Navbar />
			<Container
				style={{
					minHeight: "100vh",
					backgroundColor: "white",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography component="h6" variant="subtitle1">
					Welcome Home {email}
				</Typography>
				<StepperComponent />

				<Box sx={{ mt: 5, width: "40%" }}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<ControllerTexFieldComp
							name="firstName"
							value={firstName}
							autoFocus={true}
							type="text"
							label="First Name"
							control={control}
						/>
						<ControllerTexFieldComp
							name="lastName"
							value={lastName}
							type="text"
							label="Last Name"
							control={control}
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mb: 2 }}
							style={{ marginTop: "20px" }}
						>
							Next
						</Button>
					</form>
				</Box>
			</Container>
		</Box>
	);
};

export default HomePage;
