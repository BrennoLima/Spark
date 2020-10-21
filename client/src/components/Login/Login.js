import React, { useState } from 'react';
import './login.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { login } from '../../actions/auth';
import { Link, Redirect } from 'react-router-dom';

const Register = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const { email, password } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const dispatch = useDispatch();
	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(login({ email, password }));
	};

	const auth = useSelector((state) => state.auth);
	if (auth.isAuthenticated) {
		if (auth.user.isTeacher) {
			return <Redirect to='/teacherhome' />;
		} else {
			return <Redirect to='/studenthome' />;
		}
	}

	return (
		<>
			<div className='container register-container'>
				<h1 className='register-title'>Login</h1>

				<Form onSubmit={(e) => onSubmit(e)}>
					<FormGroup>
						<Label htmlFor='email'>Email</Label>
						<Input
							type='email'
							name='email'
							id='email'
							value={email}
							onChange={(e) => onChange(e)}
							required
							placeholder='jdoe@gmail.com'
						/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor='password'>Password</Label>
						<Input
							type='password'
							name='password'
							id='password'
							value={password}
							onChange={(e) => onChange(e)}
							required
						/>
					</FormGroup>
					<div className='row'>
						<p className=' mr-1 mr-md-5'>
							No account? <Link to='/register'>Sign Up</Link>
						</p>
					</div>
					<Button className='register-submit-btn'>Submit</Button>
				</Form>
			</div>
		</>
	);
};
export default Register;
