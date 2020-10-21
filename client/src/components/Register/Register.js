import React, { useState } from 'react';
import './register.css';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/auth';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from 'react-router-dom';

const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		school: '',
	});
	const [isTeacher, setIsTeacher] = useState(false);
	const handleCheckBox = () => setIsTeacher(!isTeacher);

	const { name, email, password, school } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const dispatch = useDispatch();
	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(register({ name, email, password, school, isTeacher }));
	};

	let history = useHistory();
	const auth = useSelector((state) => state.auth);
	if (auth.isAuthenticated) {
		if (auth.user) {
			if (auth.user.isTeacher) {
				history.push('/teacherhome');
			} else {
				history.push('/studenthome');
			}
		}
	}
	return (
		<>
			<div className='container register-container pb-3'>
				<h1 className='register-title'>Create your account</h1>
				<Form onSubmit={(e) => onSubmit(e)}>
					<FormGroup>
						<Label htmlFor='name'>Name</Label>
						<Input
							type='text'
							name='name'
							id='name'
							value={name}
							onChange={(e) => onChange(e)}
							required
							placeholder='John Doe'
						/>
					</FormGroup>
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
					<FormGroup>
						<Label htmlFor='school'>School</Label>
						<Input
							type='text'
							name='school'
							id='school'
							value={school}
							onChange={(e) => onChange(e)}
							required
						/>
					</FormGroup>
					<FormGroup check>
						<Label check>
							<Input
								name='isTeacher'
								type='checkbox'
								checked={isTeacher}
								onClick={handleCheckBox}
								onChange={handleCheckBox}
							/>{' '}
							Teacher
						</Label>
					</FormGroup>
					<Button className='register-submit-btn'>Submit</Button>
				</Form>
			</div>
		</>
	);
};
export default Register;
