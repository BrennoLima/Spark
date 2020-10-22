const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const { jwtSecret } = require('../../config/keys');
const auth = require('../../middleware/auth');

// @route   POST api/user
// @desc    Register a user
// @access  Public
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a valid password with more than 6 characters'
		).isLength({ min: 6 }),
		check('school', 'School name is required').not().isEmpty(),
		check('isTeacher', 'This field is required').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password, school, isTeacher } = req.body;

		try {
			// See if user is already registered
			let user = await User.findOne({ email });

			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'User already exists' }] });
			}

			user = new User({
				name,
				email,
				password,
				school,
				isTeacher,
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user: {
					id: user._id,
				},
			};

			jwt.sign(
				payload,
				jwtSecret,
				{ expiresIn: 360000 }, // change expires to 3600 before production
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

// @route   Get api/user/student/:studentId
// @desc    Get user by studentID
// @access  Private
router.get('/student/:studentId', auth, async (req, res) => {
	try {
		const student = await Student.findById(req.params.studentId);
		if (!student) {
			return res.status(404).json({ errors: [{ msg: 'Student not found' }] });
		}
		const userId = student.user;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ errors: [{ msg: 'User not found' }] });
		}

		return res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
