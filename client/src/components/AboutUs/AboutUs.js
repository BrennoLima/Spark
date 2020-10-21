import React from 'react';
import './other.css';

const AboutUs = () => {
	return (
		<div>
			<div className='mainContent pb-3'>
				<div className='content'>
					<article>
						<h1>About Us</h1>
						<p>
							<span>Spark</span> Learning is a virtual education platform, which
							is designed for everyone who is learning and looking for an
							efficient way of memorizing and practicing new material. Either
							learning with a teacher or a tutor or even on your own, Spark
							Learning is a tool, which will help everyone in this journey.
							There is no more need for teachers to come up with totally new
							questions each time they want their students to practice a topic.
							All previously created exercises are saved and ready to be altered
							and practiced again or published as a quiz. There is no question
							limit; the exercises can be as short as 10 questions or as long as
							it needs to. Flexibility is a priority for Spark Learning.
							Students can save their exercises and practice as many times as
							they need to, whenever they feel like it. The easy to create
							exercises can cover almost any field of knowledge from a language
							to medicine terminology. Just create a question and define the
							answer. Students can keep practicing these randomly displayed
							questions until they feel confident with their knowledge. They can
							also create exercises for themselves if they feel like they need
							to or want to practice a topic, which will also give an
							opportunity for self-learning.
							<br />
							<span>During</span> the Covid-19 pandemic, we are trying to
							contribute and help reduce the corona virus' impact on our
							society. Elementary and secondary schools had faced a rapid and
							unprepared switch from a traditional way of learning to online
							education. Educational institutions are still looking for a fun
							and efficient complement to their learning platforms, which would
							solve many issues like communication, collaboration and
							automation. We believe we have solved the automation issue by
							facing the challenge of the lack of extra-curricular interactive
							learning to perfectly suit to the topic currently learned by a
							student. We have created a platform that would be fit not just for
							elementary and secondary school students, but for everyone
							including people who are not currently at school, and who just
							want to level up their memory. With this platform, teachers would
							compensate for a lack of face-to-face teaching with a program that
							would take a part of the heat off them in helping students
							consolidate new material on their own and reinforce their
							knowledge.
						</p>
						<div className='empty1'></div>
					</article>

					<aside>
						<h1>Testimony</h1>

						<figure>
							<blockquote>
								"As parents, we also have become home-schoolers. With Spark we
								can easily keep our kids on track with their studies and help
								their teachers get the job done"
								<figcaption>&mdash; John Smith | Parent</figcaption>
							</blockquote>
							<div className='empty2 mb-1'></div>
						</figure>

						<figure>
							<blockquote>
								"Spark has created a bridge between learning and applying,
								helping students to have a great e-learning experience while
								making our job much easier."
								<figcaption>&mdash; Sarah Doe | Teacher</figcaption>
							</blockquote>
							<div className='empty2 mb-1'></div>
						</figure>

						<figure className='last'>
							<blockquote>
								"I have been looking for a memorization platform to improve my
								memory. When I found Spark Learning, I realized that with this
								platform I can also learn something I have been always
								struggling with. For example, names of world cities or learn
								more things that require not just understanding but long-term
								memorization. In addition to building my memory, this platform
								helped me build my knowledge."
								<figcaption>&mdash; Harry Anderson | User</figcaption>
							</blockquote>
							<div className='empty2 mb-0'></div>
						</figure>
					</aside>
				</div>
			</div>
		</div>
	);
};

export default AboutUs;
