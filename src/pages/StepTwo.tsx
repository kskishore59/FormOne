import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, FormLabel, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { CustomSlider } from "../components/formFields/CustomSlider";
import { CustomDateCom } from "../components/formFields/DateFieldController";
import { CustomRadioCom } from "../components/formFields/RadioController";
import { ControllerTexFieldComp } from "../components/formFields/TextFieldController";
import IPageProps from "../interfaces/page";
import { Step2, steps, updateDetails } from "../store/rootSlice";
import { AppDispatch, RootState } from "../store/store";
import Navbar from "./Navbar";
import moment from "moment";
import StepperComponent from "../components/StepperComponent/StepperComponent";

const StepTwoPage: React.FunctionComponent<IPageProps> = (props) => {
	const dispatch: AppDispatch = useDispatch();
	const details = useSelector((state: RootState) => state);
	const { firstName, lastName, dob, gender, phoneNumber, annualIncome } =
		details.yourDetails;
	const { email } = details.auth;
	const validationSchema = Yup.object().shape({
		gender: Yup.string()
			.required("Please Select Gender")
			.oneOf(["male", "female", "others"]),
		annualIncome: Yup.number()
			.required("Please Select Annual Income")
			.min(1, "Please Select Annual Income of more than 1")
			.typeError("Please select your Annual Income"),
		dob: Yup.string()
			.required("Please select Date of birth")
			.typeError("Please enter valid date")
			.test("DOB", "Must be greater than 18 years", (value) => {
				return moment().diff(moment(value), "years") >= 18;
			}),
		phoneNumber: Yup.string()
			.min(10, "Please Enter Valid Number")
			.max(10, "Phone number should be 10 characters")
			.required("Please enter your phone number")
			.typeError("Must be only numbers from 0-9"),
	});

	const { handleSubmit, control } = useForm<Step2>({
		resolver: yupResolver(validationSchema),
		defaultValues: { dob, gender, phoneNumber, annualIncome },
	});
	const push = useNavigate();

	useEffect(() => {
		if (!firstName || !lastName) {
			push("/");
		}
	});

	const onClickBack = () => {
		push("/");
	};

	const onSubmit: SubmitHandler<Step2> = (data) => {
		console.log(data);
		dispatch(updateDetails(data));
		dispatch(steps({ stepTwo: true }));
		push("/step3");
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
				<Box sx={{ mt: 2, p: 2, width: "40%" }}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<CustomDateCom
							name="dob"
							type=""
							label="Date of Birth"
							control={control}
						/>
						<ControllerTexFieldComp
							name="phoneNumber"
							type="number"
							label="Phone Number"
							control={control}
						/>
						<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
						<CustomRadioCom
							name="gender"
							value={gender}
							label="Gender"
							control={control}
							type="radio"
						/>
						<div>
							<FormLabel htmlFor="customRange2">
								Annual Income (LPA) :{" "}
							</FormLabel>
							<CustomSlider
								name="annualIncome"
								label="Annual Income"
								type="slider"
								control={control}
								value={annualIncome}
							/>
						</div>
						<div>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								style={{ marginBottom: 15, marginTop: 10 }}
							>
								Next
							</Button>
							<Button
								type="button"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
								onClick={onClickBack}
							>
								Back
							</Button>
						</div>
					</form>
				</Box>
			</Container>
		</Box>
	);
};

export default StepTwoPage;
