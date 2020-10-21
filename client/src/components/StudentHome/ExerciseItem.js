import React, { useState } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import SolveExerciseModal from './SolveExerciseModal';

const ExerciseItem = ({ actv }) => {
	const [modal, setModal] = useState(false);
	let marks = useSelector((state) => state.student.student.marks);
	const mark = marks.filter((mark) => mark.exercise === actv._id)[0];

	return (
		<>
			<SolveExerciseModal isOpen={modal} setModal={setModal} activity={actv} />
			<ListGroup.Item variant='light'>
				<div className='row'>
					<div className='col-4'>{actv.title}</div>
					<div className='col-4'>{actv.subject}</div>
					<div className='col-1'>
						{actv.isQuizz && mark ? (
							<Button variant='info' onClick={() => setModal(!modal)} disabled>
								<i className='fas fa-pencil-alt' />
							</Button>
						) : (
							<Button variant='info' onClick={() => setModal(!modal)}>
								<i className='fas fa-pencil-alt' />
							</Button>
						)}
					</div>

					<div className='col-3 c-align'>
						{actv.isQuizz && mark ? `${mark.grade}%` : <></>}
					</div>
				</div>
			</ListGroup.Item>
		</>
	);
};
export default ExerciseItem;
