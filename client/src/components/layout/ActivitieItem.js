import React, { useState } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { RemoveActivity } from '../../actions/activities';
import { useDispatch } from 'react-redux';
import SendActivitieModal from '../TeacherHome/SendActivitieModal';

const ActivitieItem = ({ actv }) => {
	const dispatch = useDispatch();
	const [modal, setModal] = useState(false);

	return (
		<>
			<SendActivitieModal isOpen={modal} setModal={setModal} activitie={actv} />
			<ListGroup.Item variant='light'>
				<div className='row'>
					<div className='col-4'>{actv.title}</div>
					<div className='col-4'>{actv.subject}</div>
					<div className='col-2'>
						<Button variant='info' onClick={() => setModal(!modal)}>
							<i className='fas fa-share-square' />
						</Button>
					</div>

					<div className='col-1'>
						<Button
							variant='danger'
							onClick={() => dispatch(RemoveActivity(actv._id))}
						>
							<span className='fas fa-times' />
						</Button>
					</div>
				</div>
			</ListGroup.Item>
		</>
	);
};
export default ActivitieItem;
