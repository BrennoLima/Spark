const express = require('express');
const router = express.Router();
const Student = require('../../models/Student');
const Teacher = require('../../models/Teacher');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Exercise = require('../../models/Exercise');

// @route     GET api/exercise
// @desc      Get all exercises
// @access    Public
router.get('/', async (req, res) => {
	try {
		const exercises = await Exercise.find();
		res.json(exercises);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route     GET api/exercise/:id
// @desc      Get specific exercise by id
// @access    Public
router.get('/student/:exerciseId', async (req, res) => {
	try {
		const exercise = await Exercise.findById(req.params.exerciseId);
		res.json(exercise);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route     GET api/exercise/:teacherEmail
// @desc      Get all exercises from specific teacher
// @access    Public
router.get('/:teacherEmail', async (req, res) => {
	try {
		const exercises = await Exercise.find({
			createdBy: req.params.teacherEmail,
		});
		res.json(exercises);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route   POST api/exercise
// @desc    Create an exercise
// @access  Private
router.post(
	'/',

	[
		check('title', 'Title is required').not().isEmpty(),
		check('subject', 'Subject is required').not().isEmpty(),
		check('isQuizz', 'isQuizz is required').not().isEmpty(),
	],
	auth,
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			let teacher = await User.findById(req.user.id);

			if (!teacher.isTeacher) {
				return res.status(401).json({ msg: 'Unauthorized' });
			}
			teacher = await Teacher.findOne({ user: teacher });

			const {
				title,
				subject,
				isQuizz,
				question1,
				question2,
				question3,
				question4,
				question5,
				answer1,
				answer2,
				answer3,
				answer4,
				answer5,
			} = req.body;

			let exercise = new Exercise({
				title,
				subject,
				isQuizz,
				question1,
				question2,
				question3,
				question4,
				question5,
				answer1,
				answer2,
				answer3,
				answer4,
				answer5,
			});
			exercise.createdBy = teacher.email;

			await exercise.save();

			res.json(exercise);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

// @route   DELETE api/exercise/delete/:exerciseId
// @desc    Delete an exercise
// @access  Private
router.delete('/delete/:exerciseId', auth, async (req, res) => {
	try {
		let teacher = await User.findById(req.user.id);

		if (!teacher.isTeacher) {
			return res.status(401).json({ msg: 'Unauthorized' });
		}
		teacher = await Teacher.findOne({ user: teacher });

		let exercise = await Exercise.findById(req.params.exerciseId);
		if (!exercise) {
			return res.status(404).json({ msg: 'Exercise not found' });
		}
		if (JSON.stringify(teacher.email) !== JSON.stringify(exercise.createdBy)) {
			return res
				.status(401)
				.json({ msg: 'Unauthorized, only exercise owner can delete.' });
		}

		await Exercise.findByIdAndDelete(req.params.exerciseId);
		return res.json(exercise);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route   POST api/exercise/:studentEmail/:exerciseId
// @desc    Send an exercise to a student
// @access  Private
router.post('/:studentEmail/:exerciseId', auth, async (req, res) => {
	try {
		let teacher = await User.findById(req.user.id);

		if (!teacher.isTeacher) {
			return res.status(401).json({ msg: 'Unauthorized' });
		}
		teacher = await Teacher.findOne({ user: teacher });

		let exercise = await Exercise.findById(req.params.exerciseId);
		if (!exercise) {
			return res.status(404).json({ msg: 'Exercise not found' });
		}

		let student = await Student.findOne({ email: req.params.studentEmail });
		if (!student) {
			return res.status(404).json({ msg: 'Student not found' });
		}
		if (
			student.exercises.some(
				(exc) => JSON.stringify(exc._id) === JSON.stringify(exercise._id)
			)
		) {
			return res.status(400).json({ msg: 'Exercise already sent' });
		}
		student.exercises.unshift(exercise);
		await student.save();
		res.json(student);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route   DELETE api/exercise/:studentEmail/:exerciseId
// @desc    Delete an exercise from a student profile
// @access  Private
router.delete('/:studentEmail/:exerciseId', auth, async (req, res) => {
	try {
		let teacher = await User.findById(req.user.id);

		if (!teacher.isTeacher) {
			return res.status(401).json({ msg: 'Unauthorized' });
		}
		teacher = await Teacher.findOne({ user: teacher });

		let exercise = await Exercise.findById(req.params.exerciseId);
		if (!exercise) {
			return res.status(404).json({ msg: 'Exercise not found' });
		}

		let student = await Student.findOne({ email: req.params.studentEmail });
		if (!student) {
			return res.status(404).json({ msg: 'Student not found' });
		}
		let save = 0;
		student.exercises.map((exc, index) => {
			if (JSON.stringify(exc._id) === JSON.stringify(exercise._id)) {
				student.exercises.splice(index, 1);
				save = 1;
			}
		});
		if (save === 1) {
			await student.save();
			return res.json(student);
		}

		return res.status(400).json({ msg: 'Exercise already deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
