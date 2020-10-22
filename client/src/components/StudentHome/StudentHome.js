import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './studenthome.css';
import { ListGroup } from 'react-bootstrap';
import { Collapse } from 'reactstrap';
import { loadStudent } from '../../actions/student';
import ExerciseItem from './ExerciseItem';

const StudentHome = () => {
	const dispatch = useDispatch();

	const { loading, student } = useSelector((state) => state.student);

	const activities = useSelector((state) => state.activities);

	const [exerciseList, collapseExerciseList] = useState(true);
	const [quizzesList, collapseQuizzesList] = useState(true);

	useEffect(() => {
		dispatch(loadStudent());
	}, [dispatch]);

	return (
		<div className='container-fluid studenthome-container'>
			<div className='container controllers'>
				<div className='row justify-content-left p-3'>
					<h1>Welcome {!loading && student !== null && student.name}</h1>
				</div>
			</div>
			<div className='container exercise-list mt-3'>
				<div className='row'>
					<div className='col'>
						<h2>Exercises</h2>
					</div>
					<div className='col'>
						<span
							className='fas fa-angle-down collapse-span'
							onClick={() => collapseExerciseList(!exerciseList)}
						/>
					</div>
				</div>
				<Collapse isOpen={exerciseList}>
					<ListGroup>
						{!activities.loading &&
							activities.activities &&
							activities.activities.length > 0 && (
								<ListGroup.Item>
									<div className='row'>
										<div className='col-4'>
											<h4>Exercise </h4>
										</div>
										<div className='col-4'>
											<h4>Subject </h4>
										</div>
										<div className='col-2'>
											<h4>Solve </h4>
										</div>
										<div className='col-2' />
									</div>
								</ListGroup.Item>
							)}
						{!activities.loading &&
							activities.activities !== null &&
							activities.activities.map((exercise) =>
								exercise.isQuizz ? (
									<></>
								) : (
									<ExerciseItem key={exercise._id} actv={exercise} />
								)
							)}
					</ListGroup>
				</Collapse>
			</div>
			<div className='container quizzes-list mt-3'>
				<div className='row'>
					<div className='col'>
						<h2>Quizzes</h2>
					</div>
					<div className='col'>
						<span
							className='fas fa-angle-down collapse-span'
							onClick={() => collapseQuizzesList(!quizzesList)}
						/>
					</div>
				</div>
				<Collapse isOpen={quizzesList}>
					<ListGroup>
						{!activities.loading &&
							activities.activities &&
							activities.activities.length > 0 && (
								<ListGroup.Item>
									<div className='row'>
										<div className='col-4'>
											<h4>Quiz </h4>
										</div>
										<div className='col-4'>
											<h4>Subject </h4>
										</div>
										<div className='col-1'>
											<h4>Solve </h4>
										</div>
										<div className='col-3'>
											<h4 className='c-align'>Marks</h4>
										</div>
									</div>
								</ListGroup.Item>
							)}
						{!activities.loading &&
							activities.activities.length > 0 &&
							activities.activities.map((exercise, index) =>
								exercise.isQuizz ? (
									<ExerciseItem key={exercise._id} actv={exercise} />
								) : (
									<></>
								)
							)}
					</ListGroup>
				</Collapse>
			</div>
		</div>
	);
};
export default StudentHome;
