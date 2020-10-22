import React, { useEffect, useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { Collapse } from 'reactstrap';
import './teacherhome.css';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import StudentItem from '../layout/studentItem';
import ActivitieItem from '../layout/ActivitieItem';
import CreateActivityModal from './CreateActivityModal';
import AddStudentModal from './AddStudentModal';
import { loadTeacher } from '../../actions/teacher';

const Btn5 = styled(Button)`
	border-radius: 0.5rem;
	background-color: #f4a261;
	color: black;
	border: none;
	&:hover {
		background-color: white;
		color: black;
	}
`;

const TeacherHome = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadTeacher());
	}, [dispatch]);

	// Add students modal controllers
	const [AddStudent, setAddStudent] = useState(false);
	const closeAddStudent = () => setAddStudent(false);
	const openAddStudent = () => setAddStudent(true);

	// Create activity modal controllers
	const [CreateActivity, setCreateActivity] = useState(false);
	const closeCreateActivity = () => setCreateActivity(false);
	const openCreateActivity = () => setCreateActivity(true);

	// Student list collapse controllers
	const [studentList, collapseStudentList] = useState(true);

	// Exercise list collapse controllers
	const [exerciseList, collapseExerciseList] = useState(true);

	// Quizz list collapse controllers
	const [quizzesList, collapsequizzesList] = useState(true);

	const { teacher, loading } = useSelector((state) => state.teacher);

	const activities = useSelector((state) => state.activities);

	return (
		<>
			{/* add student modal */}
			<AddStudentModal
				AddStudent={AddStudent}
				closeAddStudent={closeAddStudent}
			/>
			<CreateActivityModal
				CreateActivity={CreateActivity}
				closeCreateActivity={closeCreateActivity}
			/>

			<div className='container-fluid teacherhome-container'>
				<div className='container controllers'>
					<div className='row justify-content-left p-3'>
						<h1>Welcome {!loading && teacher !== null && teacher.name}</h1>
					</div>
					<div className='row justify-content-left mb-5'>
						<Btn5
							variant='light'
							className='m-1 mr-3 mb-2'
							onClick={openAddStudent}
						>
							Add Student
						</Btn5>

						<Btn5
							variant='light'
							className='m-1 mr-3 mb-2'
							onClick={openCreateActivity}
						>
							Create Activity
						</Btn5>
					</div>
				</div>

				<div className='container student-list mt-3'>
					<div className='row'>
						<div className='col'>
							<h2>Students</h2>
						</div>
						<div className='col'>
							<span
								className='fas fa-angle-down collapse-span'
								onClick={() => collapseStudentList(!studentList)}
							/>
						</div>
					</div>
					<Collapse isOpen={studentList}>
						<ListGroup>
							{!loading && teacher.students.length > 0 && (
								<ListGroup.Item>
									<div className='row'>
										<div className='col-5'>
											<h4>Name </h4>
										</div>
										<div className='col-5'>
											<h4>Email </h4>
										</div>
										<div className='col-2' />
									</div>
								</ListGroup.Item>
							)}
							{!loading &&
								teacher !== null &&
								teacher.students.map((student) => (
									<StudentItem key={student._id} std={student} />
								))}
						</ListGroup>
					</Collapse>
				</div>
				<div className='container exercise-list mt-5'>
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
												<h4>Title </h4>
											</div>
											<div className='col-4'>
												<h4>Subject</h4>
											</div>
											<div className='col-2'>
												<h4>Share</h4>
											</div>
											<div className='col-1' />
										</div>
									</ListGroup.Item>
								)}
							{!activities.loading &&
								activities.activities !== null &&
								activities.activities.map((activitie) =>
									activitie.isQuizz ? (
										<></>
									) : (
										<ActivitieItem key={activitie._id} actv={activitie} />
									)
								)}
						</ListGroup>
					</Collapse>
				</div>
				<div className='container quizz-list mt-5'>
					<div className='row'>
						<div className='col'>
							<h2>Quizzes</h2>
						</div>
						<div className='col'>
							<span
								className='fas fa-angle-down collapse-span'
								onClick={() => collapsequizzesList(!quizzesList)}
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
												<h4>Title </h4>
											</div>
											<div className='col-4'>
												<h4>Subject</h4>
											</div>
											<div className='col-2'>
												<h4>Share</h4>
											</div>
											<div className='col-1' />
										</div>
									</ListGroup.Item>
								)}
							{!activities.loading &&
								activities.activities !== null &&
								activities.activities.map((activitie) =>
									activitie.isQuizz ? (
										<ActivitieItem key={activitie._id} actv={activitie} />
									) : (
										<></>
									)
								)}
						</ListGroup>
					</Collapse>
				</div>
			</div>
		</>
	);
};
export default TeacherHome;
