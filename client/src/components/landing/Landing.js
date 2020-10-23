import React from 'react';
import './landing.css';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import LandingPageMobile from '../../assets/images/landingPageMobile.png';
import LandingPageDesktop from '../../assets/images/landingPageDesktop.png';
import styled from 'styled-components';

const Btn2 = styled(Button)`
	background-color: #f4a261;
	color: black;
	border: none;
	width: 12rem;
	height: 4rem;
	border-radius: 1rem;
`;
const StyledLink = styled(Link)`
	text-decoration: none;
	color: black;
	&:hover {
		text-decoration: none;
		color: black;
	}
`;

const Landing = () => {
	const width = document.documentElement.clientWidth;
	let LandingPagePicture = LandingPageDesktop;
	if (width < 900) {
		LandingPagePicture = LandingPageMobile;
	}

	return (
		<div className='container-fluid landing-container'>
			<div className='row panel-container'>
				<div className='left-panel col-12 col-md-6'>
					<div className='row'>
						<div className='title-container'>
							<div className='col-12'>
								<h1 className='title'>
									<b>
										Get in touch with your students, your teachers, and your
										peers by practicing new knowledge.
									</b>
								</h1>
							</div>
							<div className='col-12'>
								<h1 className='subtitle'>
									<b>All in one place.</b>
								</h1>
							</div>
						</div>
					</div>

					<div className='row justify-content-center'>
						<div className='col-12 col-md-5 mb-3 '>
							<h2 className='subtitle2 ml-5 ml-md-0'>
								<b>Start learning now!</b>
							</h2>
						</div>
					</div>
					<div className='row justify-content-center mb-3 mb-md-0'>
						<div className='col-7 mb-2 mb-md-0 col-md-4'>
							<StyledLink to='/aboutteacher'>
								<Btn2 id='teacher' variant='outline-light'>
									I'm a teacher
								</Btn2>
							</StyledLink>
						</div>
						<div className='col-7 col-md-4'>
							<StyledLink to='/aboutstudent'>
								<Btn2 id='student' variant='outline-light'>
									I'm a student
								</Btn2>
							</StyledLink>
						</div>
					</div>
				</div>
				<div className='right-panel col-12 col-md-6 pb-5'>
					<div className='row'>
						<Image
							src={LandingPagePicture}
							alt='Young student'
							className='landingpage-pic'
							fluid
						/>
					</div>
					<div className='row justify-content-center testimonials'>
						<div className='col-12 col-md-5'>
							<Toast>
								<ToastHeader>
									<b>John Smith | Parent</b>
								</ToastHeader>
								<ToastBody>
									"As parents, we also have become home-schoolers. With Spark we
									can easily keep our kids on track with their studies and help
									their teachers get the job done"
								</ToastBody>
							</Toast>
						</div>
						<div className='col-12 col-md-5 mt-2 mt-md-0 mb-2 mb-md-0'>
							<Toast>
								<ToastHeader>
									<b>Sarah Doe | Teacher</b>
								</ToastHeader>
								<ToastBody>
									"Spark has created a bridge between learning and applying,
									helping students to have a great e-learning experience while
									making our job much easier."
								</ToastBody>
							</Toast>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;
