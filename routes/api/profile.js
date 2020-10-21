const express = require('express');
const router = express.Router();
const Student = require('../../models/Student');
const Teacher = require('../../models/Teacher');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const Exercise = require('../../models/Exercise');

// @route   POST api/profile
// @desc    Create a profile (generates automatically after creating user)
// @access  Private
router.post('/', auth, async (req, res) => {
	const user = await User.findById(req.user.id).select('-password');
	if (!user) {
		return res.status(400).json({ errors: [{ msg: 'User not found' }] });
	}
	if (user.isTeacher) {
		try {
			let teacher = await Teacher.findOne({ user: req.user.id });

			if (teacher) {
				// update
				return res
					.status(400)
					.json({ errors: [{ msg: 'Profile (teacher) already created' }] });
			}

			teacher = new Teacher({
				name: user.name,
				email: user.email,
				user: user,
			});

			await teacher.save();
			return res.json(teacher);
		} catch (err) {
			console.error(err.message);
			return res.status(500).send('Server error');
		}
	} else {
		try {
			let student = await Student.findOne({ user: req.user.id });
			if (student) {
				// update
				return res
					.status(400)
					.json({ errors: [{ msg: 'Profile (student) already created' }] });
			}
			student = new Student({
				name: user.name,
				email: user.email,
				user: user,
			});
			await student.save();
			return res.json(student);
		} catch (err) {
			console.error(err.message);
			return res.status(500).send('Server error');
		}
	}
});

// @route   GET api/profile
// @desc    Get a profile
// @access  Private
router.get('/', auth, async (req, res) => {
	const user = await User.findById(req.user.id).select('-password');
	if (!user) {
		return res.status(400).json({ errors: [{ msg: 'User not found' }] });
	}
	if (user.isTeacher) {
		try {
			let teacher = await Teacher.findOne({ user: req.user.id });

			if (!teacher) {
				return res
					.status(404)
					.json({ errors: [{ msg: 'Profile (teacher) not found' }] });
			}

			return res.json(teacher);
		} catch (err) {
			console.error(err.message);
			return res.status(500).send('Server error');
		}
	} else {
		try {
			let student = await Student.findOne({ user: req.user.id });
			if (!student) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Profile (student) not found' }] });
			}
			return res.json(student);
		} catch (err) {
			console.error(err.message);
			return res.status(500).send('Server error');
		}
	}
});

// @route   DELETE api/profile
// @desc    Delete the user and profile
// @access  Private
router.delete('/', auth, async (req, res) => {
	try {
		const isTeacher = await User.findById(req.user.id).select('isTeacher');

		// Remove "profile" teacher or student
		isTeacher
			? await Teacher.findOneAndRemove({ user: req.user.id })
			: await Student.findOneAndRemove({ user: req.user.id });

		// Remove user
		await User.findOneAndRemove({ _id: req.user.id });

		res.json({ msg: 'User deleted' });
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Profile not found' });
		}
		res.status(500).send('Server error');
	}
});

// @route   PUT api/profile/add/:email
// @desc    Teacher adds a student
// @access  Private
router.put('/add/:email', auth, async (req, res) => {
	try {
		let teacher = await User.findById(req.user.id);

		if (!teacher.isTeacher) {
			return res.status(401).json({ msg: 'Unauthorized' });
		}
		teacher = await Teacher.findOne({ user: teacher });
		if (!teacher) {
			return res.status(404).json({ msg: 'Teacher profile not created' });
		}

		const student = await Student.findOne({ email: req.params.email });
		if (!student) {
			return res.status(404).json({ msg: 'Student not found' });
		}

		try {
			// Check if student is already enrolled to the teacher
			const studentCheck = teacher.students.filter(
				(std) => JSON.stringify(std.studentId) === JSON.stringify(student._id)
			);
			if (studentCheck.length > 0) {
				return res.status(400).json({ msg: 'Student already enrolled' });
			}

			// Add student to teacher
			teacher.students.unshift({
				studentId: student,
				studentName: student.name,
				studentEmail: student.email,
			});
			await teacher.save();

			res.json(teacher);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route   PUT api/profile/remove/:email
// @desc    Teacher removes a student
// @access  Private
router.put('/remove/:email', auth, async (req, res) => {
	try {
		let teacher = await User.findById(req.user.id);

		if (!teacher.isTeacher) {
			return res.status(401).json({ msg: 'Unauthorized' });
		}
		teacher = await Teacher.findOne({ user: teacher });
		if (!teacher) {
			return res.status(404).json({ msg: 'Teacher profile not created' });
		}

		const student = await Student.findOne({ email: req.params.email });
		if (!student) {
			return res.status(404).json({ msg: 'Student not found' });
		}

		try {
			// Check if student is not enrolled to the teacher
			const studentCheck = teacher.students.filter(
				(std) => JSON.stringify(std.studentId) === JSON.stringify(student._id)
			);
			if (studentCheck.length === 0) {
				return res.status(400).json({ msg: 'Student not enrolled' });
			}
			// remove the student
			const removeIndex = teacher.students.indexOf(student);
			teacher.students.splice(removeIndex, 1);

			teacher.save();
			res.json(teacher);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route   GET api/profile/students
// @desc    Get a teacher's students
// @access  Private
router.get('/students', auth, async (req, res) => {
	try {
		let teacher = await User.findById(req.user.id);

		if (!teacher.isTeacher) {
			return res.status(401).json({ msg: 'Unauthorized' });
		}
		teacher = await Teacher.findOne({ user: teacher });
		if (!teacher) {
			return res.status(404).json({ msg: 'Teacher profile not created' });
		}
		return res.json(teacher.students);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route   PUT api/profile/students/:exerciseId/:mark
// @desc    Mark a student exercise (quiz)
// @access  Private
router.put(
	'/students/:studentEmail/:exerciseId/:mark',
	auth,
	async (req, res) => {
		try {
			const student = await Student.findOne({ email: req.params.studentEmail });
			if (!student) {
				return res.status(404).json({ msg: 'Student not found' });
			}
			const exercise = await Exercise.findById(req.params.exerciseId);
			if (!exercise) {
				return res.status(404).json({ msg: 'Exercise not found' });
			}

			if (
				student.marks.some(
					(mark) =>
						JSON.stringify(mark.exercise._id) === JSON.stringify(exercise._id)
				)
			) {
				return res.status(400).json({ msg: 'Exercise already marked' });
			}

			student.marks.unshift({ exercise: exercise, grade: req.params.mark });
			await student.save();
			return res.json(student);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
