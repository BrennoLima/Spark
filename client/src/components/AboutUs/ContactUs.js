import React from 'react';
import './other.css';
import GoogleMapReact from 'google-map-react';

const Marker = () => <i className='fas fa-map-marker-alt fa-lg marker' />;

const ContactUs = () => {
	return (
		<div>
			<div className='mainContent pb-3'>
				<div className='content'>
					<article>
						<h1>Contact Us</h1>
						<address>
							<span>
								<i class='fas fa-map-marker-alt fa-lg' /> 1750 Finch Ave E,
								North York, ON, Canada M2J 2X5
							</span>
							<br />
							<span>
								<i className='fas fa-phone' /> (416) 491-5050
							</span>

							<br />
							<span>
								<a href='mailto:webmaster@example.com'>
									<i className='far fa-envelope fa-lg' /> Email US
								</a>
							</span>
						</address>
						<div className='map last'>
							<GoogleMapReact
								defaultCenter={{ lat: 43.7951911, lng: -79.3519011 }}
								defaultZoom={15}
							>
								<Marker lat={43.7951911} lng={-79.3519011} />
							</GoogleMapReact>
						</div>
					</article>
				</div>
			</div>
		</div>
	);
};

export default ContactUs;
