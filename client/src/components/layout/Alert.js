import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'reactstrap';

const Alerts = () => {
	const alerts = useSelector((state) => state.alert);
	if (alerts !== null && alerts.length > 0) {
		return alerts.map((alert) => (
			<Alert key={alert.id} color={`${alert.alertType}`}>
				{alert.msg}
			</Alert>
		));
	} else {
		return <div></div>;
	}
};
export default Alerts;
