import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { GiHotMeal } from "react-icons/gi";
import { ConfirmMessage } from '../../../Components/ConfirmMessage';
import { Main } from '../../../Components/Main';
import './styles.css';

export const RegistrationForm = () => {
	const [confirmMessage, setConfirmMessage] = useState(false);
	const initialFormState = {
		username: '',
		email: '',
		phoneNumber: '',
		password: '',
	};

	const initialFormErrorsState = {
		username: null,
		email: null,
		phoneNumber: null,
		password: null,
	};

	const [formData, setFormData] = useState(initialFormState);
	const [formErrors, setFormErrors] = useState(initialFormErrorsState);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			formErrors.username ||
			formErrors.email ||
			formErrors.phoneNumber ||
			formErrors.password
		) {
			console.log('Please correct errors first!');
		} else {
			console.log('Form submitted!');
			console.table(formData);
			setFormData(initialFormState);
			setConfirmMessage(true);
		}
	};

	useEffect(() => {
		if (formData.username.length < 5 && formData.username.length > 0) {
			setFormErrors((prevState) => ({
				...prevState,
				username: 'Username must be more than 5 characters',
			}));
		} else {
			setFormErrors((prevState) => ({
				...prevState,
				username: null,
			}));
		}
	}, [formData.username]);

	const handleUserNameChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			username: e.target.value,
		}));
	};
	const handlePasswordChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			password: e.target.value,
		}));
	};

	const handleEmailChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			email: e.target.value,
		}));
	};

	const handlePhoneNumberChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			phoneNumber: e.target.value,
		}));
	};

	return (
		<Main className='main-pattern'>
			{confirmMessage ? (<ConfirmMessage title='You successfully registered to the recipe platform.' />) : (
					<form className='registration-form' onSubmit={handleSubmit} noValidate>
						<div className='welcome-section'>
							<GiHotMeal className='form-logo' />
							<h3>Welcome to recipe platform!</h3>
							<p>Please enter your information.</p>
						</div>
						<TextField
							type='text'
							id='user'
							name='user'
							value={formData.username}
							onChange={handleUserNameChange}
							label='Username'
							variant="standard"
						/>

						{formErrors.username ? <p>{formErrors.username}</p> : <></>}
						<TextField
							type='email'
							id='email'
							name='email'
							value={formData.email}
							onChange={handleEmailChange}
							label='Email'
							variant="standard"
						/>
						<TextField
							type='tel'
							id='phoneNumber'
							name='phoneNumber'
							value={formData.phoneNumber}
							onChange={handlePhoneNumberChange}
							label='Phone Number'
							variant="standard"
						/>
						<TextField
							type='password'
							id='password'
							name='password'
							value={formData.password}
							onChange={handlePasswordChange}
							label='Password'
							variant="standard"
						/>
						<button
							type='submit'
							disabled={
								formErrors.username ||
								formErrors.email ||
								formErrors.phoneNumber ||
								formErrors.password
							}
							className='form-btn--submit'
						>
							Register
						</button>
					</form>)}
		</Main>
	);
};