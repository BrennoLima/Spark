import React, { useState } from 'react';
import './navbar.css';
import { Button, Image, Modal, Form } from 'react-bootstrap';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
} from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Brand from '../../assets/images/Brand.png';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/auth';
import { logout } from '../../actions/auth';

const Btn1 = styled(Button)`
	border-radius: 0.7rem;
	margin: 0.5rem;
	width: 7rem;
`;
const Btn2 = styled(Btn1)`
	background-color: #f4a261;
	color: black;
	border: none;
	&:hover {
		background-color: white;
		color: black;
	}
`;

const ModalBtn = styled(Button)`
	border-radius: 0.3rem;
`;
const StyledLink = styled(Link)`
	text-decoration: none;
	color: black;
	&:hover {
		text-decoration: none;
		color: black;
	}
`;

const NavbarComponent = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const clearForm = () => {
		setFormData({
			email: '',
			password: '',
		});
	};
	const dispatch = useDispatch();
	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(login({ email, password }));
		clearForm();
	};

	let history = useHistory();
	const auth = useSelector((state) => state.auth);
	if (auth.isAuthenticated) {
		if (auth.user) {
			if (auth.user.isTeacher !== null && auth.user.isTeacher) {
				history.push('/teacherhome');
			} else if (auth.user.isTeacher !== null && !auth.user.isTeacher) {
				history.push('/studenthome');
			}
		}
	}

	const logOut = (e) => {
		dispatch(logout());
	};
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Login</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={(e) => onSubmit(e)}>
						<Form.Group controlId='formBasicEmail'>
							<Form.Label>Email:</Form.Label>
							<Form.Control
								type='email'
								name='email'
								value={email}
								onChange={(e) => onChange(e)}
								placeholder='example@user.com'
							/>
						</Form.Group>

						<Form.Group controlId='formBasicPassword'>
							<Form.Label>Password:</Form.Label>
							<Form.Control
								type='password'
								name='password'
								value={password}
								onChange={(e) => onChange(e)}
								placeholder='Password'
							/>
						</Form.Group>
						<ModalBtn
							variant='secondary'
							className='ml-1 mr-1'
							onClick={handleClose}
						>
							Close
						</ModalBtn>
						<ModalBtn
							type='submit'
							variant='primary'
							className='ml-1 mr-1'
							onClick={handleClose}
						>
							Login
						</ModalBtn>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<div className='row'>
						<p className=' mr-1 mr-md-5'>
							No account?{' '}
							<Link to='/register' onClick={handleClose}>
								Sign Up
							</Link>
						</p>
					</div>
				</Modal.Footer>
			</Modal>
			<Navbar dark expand='md'>
				<NavbarBrand href='/'>
					<Image src={Brand} alt='Logo' className='logo' />{' '}
					<h1 className='brand-title'>
						<b>Spark Learning</b>
					</h1>
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className='ml-auto' navbar>
						{!auth.loading && auth.isAuthenticated && auth.user !== null ? (
							<>
								<NavItem>
									<StyledLink
										to={auth.user.isTeacher ? '/teacherhome' : '/studenthome'}
									>
										<Btn1 variant='outline-light'>Dashboard</Btn1>
									</StyledLink>
								</NavItem>
								<NavItem>
									<StyledLink to='/account'>
										<Btn1 variant='outline-light'>My Account</Btn1>
									</StyledLink>
								</NavItem>
								<NavItem>
									<Btn1 variant='danger' onClick={(e) => logOut(e)}>
										Logout
									</Btn1>
								</NavItem>
							</>
						) : (
							<>
								<NavItem>
									<Btn1 variant='outline-light' onClick={handleShow}>
										Login
									</Btn1>
								</NavItem>
								<NavItem>
									<StyledLink to='/register'>
										<Btn2 variant='success'>Sign Up</Btn2>
									</StyledLink>
								</NavItem>
							</>
						)}
					</Nav>
				</Collapse>
			</Navbar>
		</>
	);
};

export default NavbarComponent;
