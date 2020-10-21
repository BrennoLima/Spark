import React, { useState } from 'react';
import { SendActivitie } from '../../actions/activities';
import { useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';

const SendActivitieModal = ({ isOpen, setModal, activitie }) => {
	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(SendActivitie(email, activitie._id));
	};

	const dispatch = useDispatch();
	const [email, setEmail] = useState('');

	return (
		<Modal show={isOpen} onHide={() => setModal(false)}>
			<Modal.Header closeButton>
				<Modal.Title>{`Send Activitie: ${activitie.title}`}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={(e) => onSubmit(e)}>
					<Form.Group controlId='formBasicEmail'>
						<Form.Label>Student Email</Form.Label>
						<Form.Control
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='jdoe@gmail.com'
						/>
					</Form.Group>
					<Button
						type='submit'
						variant='primary'
						onClick={() => setModal(false)}
					>
						Send
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};
export default SendActivitieModal;
