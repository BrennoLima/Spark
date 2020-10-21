import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { addStudent } from '../../actions/teacher';

const AddStudentModal = ({ AddStudent, closeAddStudent }) => {
	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(addStudent(email));
	};
	// add student modal controllers

	const dispatch = useDispatch();
	const [email, setEmail] = useState('');

	return (
		<Modal show={AddStudent} onHide={closeAddStudent}>
			<Modal.Header closeButton>
				<Modal.Title>Add student</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={(e) => onSubmit(e)}>
					<Form.Group controlId='formBasicEmail'>
						<Form.Label>Student Email</Form.Label>
						<Form.Control
							type='email'
							name='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='johndoe@gmail.com'
						/>
					</Form.Group>
					<Button type='submit' variant='primary' onClick={closeAddStudent}>
						ADD
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};
export default AddStudentModal;
