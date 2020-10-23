import React from 'react';
import './StudentTeacher.css';

const StudentAbout = () => {
	return (
		<div>
			<div className='screen'>
				<div className='contentM'>
					<h1>For students: How to use Spark Learning</h1>

					<p className='firstGreeting'>
						<b>
							<i>
								<span className='greeting'>Welcome</span> to Spark Learning!
							</i>
						</b>
					</p>

					<ul>
						<li>Fast and Easy Sign Up</li>
						<p>
							- Create your account in less than a minute and start using our
							services right away!
						</p>

						<li>Individual Dashboard</li>
						<p>
							- Each user has their unique dashboard, displaying their students,
							exercises and quizzes
						</p>

						<li>Exercises</li>
						<p>
							- Exercises can be done as many times as you want
							<br />
							- If you feel like you need to refresh you knowledge on a specific
							topic, come back to the exercise and practice some more
							<br />
							- You will be able to see the marks after the exercise is
							submitted, to keep track of your progress
							<br />
							- Exercise's marks will not be visible to teachers
							<br />- You will also be able to check the correct answers for the
							exercises
						</p>

						<li>Quizzes</li>
						<p>
							- Quizzes can be done only once
							<br />
							- Automatically graded after submission, marks are saved on your
							dashboard
							<br />- Unlike exercises, you are not able to check the correct
							answers
						</p>
					</ul>

					<p className='endGreeting'>
						<b>
							<i>
								<span className='greeting'>Enjoy</span> your new learning
								experience!
							</i>
						</b>
					</p>
				</div>
			</div>
		</div>
	);
};
export default StudentAbout;
