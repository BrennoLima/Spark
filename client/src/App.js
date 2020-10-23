import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/landing/Landing';
import Register from './components/Register/Register';
import NavbarComponent from './components/Navbar/NavbarComponent';
import Alerts from './components/layout/Alert';
import StudentHome from './components/StudentHome/StudentHome';
import TeacherHome from './components/TeacherHome/TeacherHome';
import FooterComponent from './components/Footer/FooterComponent';
import AboutUs from './components/AboutUs/AboutUs';
import ContactUs from './components/AboutUs/ContactUs';
import StudentAbout from './components/StudentTeacher/StudentAbout';
import TeacherAbout from './components/StudentTeacher/TeacherAbout';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
// Redux
import { Provider } from 'react-redux';
import store from './store';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<NavbarComponent />
				<Alerts />
				<Switch>
					<Route exact path='/' component={Landing} />
					<Route exact path='/register' component={Register} />
					<PrivateRoute exact path='/studenthome' component={StudentHome} />
					<PrivateRoute exact path='/teacherhome' component={TeacherHome} />
					<Route exact path='/aboutus' component={AboutUs} />
					<Route exact path='/contactus' component={ContactUs} />
					<Route exact path='/aboutstudent' component={StudentAbout} />
					<Route exact path='/aboutteacher' component={TeacherAbout} />
				</Switch>
				<FooterComponent />
			</Router>
		</Provider>
	);
};

export default App;
