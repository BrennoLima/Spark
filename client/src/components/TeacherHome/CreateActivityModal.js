import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { AddActivity } from '../../actions/activities';

const CreateActivity = ({ CreateActivity, closeCreateActivity }) => {
	// add student modal controllers
	const [formData, setFormData] = useState({
		title: '',
		subject: '',
		question1: '',
		answer1: '',
		question2: '',
		answer2: '',
		question3: '',
		answer3: '',
		question4: '',
		answer4: '',
		question5: '',
		answer5: '',
	});
	const [isQuizz, setIsQuizz] = useState(false);
	const {
		title,
		subject,
		question1,
		answer1,
		question2,
		answer2,
		question3,
		answer3,
		question4,
		answer4,
		question5,
		answer5,
	} = formData;
	const clearForm = () => {
		setFormData({
			title: '',
			subject: '',
			question1: '',
			answer1: '',
			question2: '',
			answer2: '',
			question3: '',
			answer3: '',
			question4: '',
			answer4: '',
			question5: '',
			answer5: '',
		});
		setIsQuizz(false);
	};
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const dispatch = useDispatch();
	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(
			AddActivity({
				title,
				subject,
				isQuizz,
				question1,
				answer1,
				question2,
				answer2,
				question3,
				answer3,
				question4,
				answer4,
				question5,
				answer5,
			})
		);
		clearForm();
	};
	return (
		<Modal show={CreateActivity} onHide={closeCreateActivity} size='lg'>
			<Modal.Header closeButton>
				<Modal.Title>Create Activity</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={(e) => onSubmit(e)}>
					<Form.Group controlId='formBasicActivity'>
						<Form.Label>Title</Form.Label>
						<Form.Control
							type='text'
							name='title'
							value={title}
							onChange={(e) => onChange(e)}
							placeholder='Practice Exercise 1'
						/>
					</Form.Group>
					<Form.Group controlId='formBasicActivity'>
						<Form.Label>Subject</Form.Label>
						<Form.Control
							type='text'
							name='subject'
							value={subject}
							onChange={(e) => onChange(e)}
							placeholder='English'
						/>
					</Form.Group>
					<Form.Group controlId='formBasicCheckbox'>
						<Form.Check
							type='checkbox'
							label='Quizz'
							value={isQuizz}
							onClick={() => setIsQuizz(!isQuizz)}
						/>
					</Form.Group>
					<Form.Group controlId='formBasicActivity'>
						<Form.Label>Question 1</Form.Label>
						<Form.Control
							type='text'
							name='question1'
							value={question1}
							onChange={(e) => onChange(e)}
							placeholder='Question 1'
						/>
						<Form.Label>Answer 1</Form.Label>
						<Form.Control
							type='text'
							name='answer1'
							value={answer1}
							onChange={(e) => onChange(e)}
							placeholder='Answer 1'
						/>
					</Form.Group>
					<Form.Group controlId='formBasicActivity'>
						<Form.Label>Question 2</Form.Label>
						<Form.Control
							type='text'
							name='question2'
							value={question2}
							onChange={(e) => onChange(e)}
							placeholder='Question 2'
						/>
						<Form.Label>Answer 2</Form.Label>
						<Form.Control
							type='text'
							name='answer2'
							value={answer2}
							onChange={(e) => onChange(e)}
							placeholder='Answer 2'
						/>
					</Form.Group>
					<Form.Group controlId='formBasicActivity'>
						<Form.Label>Question 3</Form.Label>
						<Form.Control
							type='text'
							name='question3'
							value={question3}
							onChange={(e) => onChange(e)}
							placeholder='Question 3'
						/>
						<Form.Label>Answer 3</Form.Label>
						<Form.Control
							type='text'
							name='answer3'
							value={answer3}
							onChange={(e) => onChange(e)}
							placeholder='Answer 3'
						/>
					</Form.Group>
					<Form.Group controlId='formBasicActivity'>
						<Form.Label>Question 4</Form.Label>
						<Form.Control
							type='text'
							name='question4'
							value={question4}
							onChange={(e) => onChange(e)}
							placeholder='Question 4'
						/>
						<Form.Label>Answer 4</Form.Label>
						<Form.Control
							type='text'
							name='answer4'
							value={answer4}
							onChange={(e) => onChange(e)}
							placeholder='Answer 4'
						/>
					</Form.Group>
					<Form.Group controlId='formBasicActivity'>
						<Form.Label>Question 5</Form.Label>
						<Form.Control
							type='text'
							name='question5'
							value={question5}
							onChange={(e) => onChange(e)}
							placeholder='Question 5'
						/>
						<Form.Label>Answer 5</Form.Label>
						<Form.Control
							type='text'
							name='answer5'
							value={answer5}
							onChange={(e) => onChange(e)}
							placeholder='Answer 5'
						/>
					</Form.Group>
					<Button type='submit' variant='primary' onClick={closeCreateActivity}>
						Create Activity
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};
export default CreateActivity;
