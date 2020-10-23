import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterLink = styled(Link)`
	text-decoration: none;
	color: black;
	font-size: 1.3vw;
	text-align: center;

	&:hover {
		text-decoration: none;
		color: red;
		font-size: 1.4vw;
	}
`;

const FooterComponent = () => {
	return (
		<div className='footer pb-1'>
			<div className='empty1'></div>
			<div className='footerContent'>
				<FooterLink to='/aboutus'>
					<p className='mb-0'>About Us</p>
					<div className='empty2 mb-1'></div>
				</FooterLink>
				<FooterLink to='/aboutstudent'>
					<p className='mb-0'>Spark Learning for students</p>
					<div className='empty2 mb-1'></div>
				</FooterLink>
				<FooterLink to='/aboutteacher'>
					<p className='mb-0'>Spark Learning for teachers</p>
					<div className='empty2 mb-1'></div>
				</FooterLink>
				<FooterLink to='/contactus'>
					<p className='mb-0'>Contact Us</p>
					<div className='empty2 pb-1'></div>
				</FooterLink>
			</div>
		</div>
	);
};

export default FooterComponent;
