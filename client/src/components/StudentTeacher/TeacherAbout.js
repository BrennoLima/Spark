import React from 'react';
import './StudentTeacher.css';

const TeacherAbout = () => {
	return (
		<div>
			<div className='screen'>
				<div className='contentM'>
					<h1>For teachers: How to use Spark Learning</h1>

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

						<li>Automatic Grading</li>
						<p>
							- Save your time, it is not necessary to grade manually! Marks are
							assigned automatically
						</p>

						<li>Add Students</li>
						<p>
							- You will be able to add your students; all you need is their
							Spark email address
							<br />- Added students are going to be displayed on your dashboard
							and you will be able to share activities with them!
						</p>

						<li>Create Activities</li>
						<p>
							- Create quizzes or exercises very easily using our activity
							template
							<br />
							- Fill the template with activity name, subject, questions,
							correct answers, and choose between quiz or exercise
							<br />- After creating an activity, you will be able to share it
							with your students using their Spark email
						</p>

						<li>Exercises</li>
						<p>
							- Exercises can be done as many times as the student wants
							<br />
							- Students are able to see their marks after the exercise is
							submitted, to keep track of their progress
							<br />
							- Exercise marks are not visible to teachers
							<br />- Students are also able to check the correct answers for
							the exercises
						</p>

						<li>Quizzes</li>
						<p>
							- Quizzes can be done only once
							<br />
							- Automatically graded after submission, marks are saved on
							students' dashboard
							<br />- Unlike exercises, students are not able to check the
							correct answers
						</p>

						<li>Share Activities</li>
						<p>
							- Easy and fast, share activities in a blink
							<br />- Teachers are able to share activities only with their
							students
						</p>

						<li>Delete Activities</li>
						<p>- Delete from students' and your dashboard in a click!</p>
					</ul>

					<p className='endGreeting'>
						<b>
							<i>
								<span className='greeting'>Enjoy</span> your new teaching
								experience!
							</i>
						</b>
					</p>
				</div>
			</div>
		</div>
	);
};
export default TeacherAbout;
