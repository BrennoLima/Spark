import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import { markExercise } from '../../actions/student';
import { setAlert } from '../../actions/alert';

const SolveExerciseModal = ({ isOpen, setModal, activity }) => {
	const [showAnsers, setShowAnswers] = useState(false);

	const [formData, setFormData] = useState({
		a1: '',
		a2: '',
		a3: '',
		a4: '',
		a5: '',
	});
	const { a1, a2, a3, a4, a5 } = formData;
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const clearForm = () => {
		setFormData({ a1: '', a2: '', a3: '', a4: '', a5: '' });
	};
	const marking = (correctAnswer, answer) => {
		if (correctAnswer === answer) return 1;
		else return 0;
	};
	const student = useSelector((state) => state.student);

	const dispatch = useDispatch();
	const onSubmit = (e) => {
		e.preventDefault();
		let marks = 0;
		marks += marking(activity.answer1, a1);
		marks += marking(activity.answer2, a2);
		marks += marking(activity.answer3, a3);
		marks += marking(activity.answer4, a4);
		marks += marking(activity.answer5, a5);
		if (activity.isQuizz) {
			dispatch(
				markExercise(student.student.email, activity._id, (marks * 100) / 5)
			);
		} else {
			dispatch(
				setAlert(`${activity.title}, Marks: ${(marks * 100) / 5}% `, 'dark')
			);
		}
		clearForm();
	};

	return (
		<Modal show={isOpen} onHide={() => setModal(false)}>
			<Modal.Header closeButton>
				<Modal.Title>
					{activity.isQuizz ? 'Quizz: ' : 'Exercise: '}
					{activity.title}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h6>Teacher: {activity.createdBy}</h6>
				<h6>
					Created at: <Moment format='MM/DD/YY'>{activity.createdAt}</Moment>{' '}
				</h6>

				<Form className='mt-5' onSubmit={(e) => onSubmit(e)}>
					<Form.Group controlId='formBasicText'>
						<Form.Label>Question 1: {activity.question1}</Form.Label>
						<Form.Control
							type='text'
							name='a1'
							value={a1}
							onChange={(e) => onChange(e)}
						/>
						{showAnsers && (
							<Form.Control
								type='text'
								className='mt-1'
								placeholder={activity.answer1}
								readOnly
							/>
						)}
					</Form.Group>
					<Form.Group controlId='formBasicText'>
						<Form.Label>Question 2: {activity.question2}</Form.Label>
						<Form.Control
							type='text'
							name='a2'
							value={a2}
							onChange={(e) => onChange(e)}
						/>
						{showAnsers && (
							<Form.Control
								type='text'
								className='mt-1'
								placeholder={activity.answer2}
								readOnly
							/>
						)}
					</Form.Group>
					<Form.Group controlId='formBasicText'>
						<Form.Label>Question 3: {activity.question3}</Form.Label>
						<Form.Control
							type='text'
							name='a3'
							value={a3}
							onChange={(e) => onChange(e)}
						/>
						{showAnsers && (
							<Form.Control
								type='text'
								className='mt-1'
								placeholder={activity.answer3}
								readOnly
							/>
						)}
					</Form.Group>
					<Form.Group controlId='formBasicText'>
						<Form.Label>Question 4: {activity.question4}</Form.Label>
						<Form.Control
							type='text'
							name='a4'
							value={a4}
							onChange={(e) => onChange(e)}
						/>
						{showAnsers && (
							<Form.Control
								type='text'
								className='mt-1'
								placeholder={activity.answer4}
								readOnly
							/>
						)}
					</Form.Group>
					<Form.Group controlId='formBasicText'>
						<Form.Label>Question 5: {activity.question5}</Form.Label>
						<Form.Control
							type='text'
							name='a5'
							value={a5}
							onChange={(e) => onChange(e)}
						/>
						{showAnsers && (
							<Form.Control
								type='text'
								className='mt-1'
								placeholder={activity.answer5}
								readOnly
							/>
						)}
					</Form.Group>
					<Button
						type='submit'
						variant='primary'
						onClick={() => setModal(false)}
					>
						Send
					</Button>
					{!activity.isQuizz && (
						<Button
							variant='success'
							className='ml-2'
							onClick={() => setShowAnswers(!showAnsers)}
						>
							Show answers
						</Button>
					)}
				</Form>
			</Modal.Body>
		</Modal>
	);
};
export default SolveExerciseModal;
