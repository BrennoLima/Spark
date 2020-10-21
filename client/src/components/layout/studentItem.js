import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { removeStudent } from '../../actions/teacher';

const StudentItem = ({ std }) => {
	const dispatch = useDispatch();
	return (
		<ListGroup.Item variant='light'>
			<div className='row'>
				<div className='col-5'>{std.studentName}</div>
				<div className='col-5'>{std.studentEmail}</div>
				<div className='col-2'>
					<Button
						variant='danger'
						onClick={() => dispatch(removeStudent(std.studentEmail))}
					>
						<span className='fas fa-times' />
					</Button>
				</div>
			</div>
		</ListGroup.Item>
	);
};
export default StudentItem;
