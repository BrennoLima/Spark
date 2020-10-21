const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	students: [
		{
			studentId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'student',
			},
			studentName: {
				type: mongoose.Schema.Types.String,
				ref: 'student.name',
			},
			studentEmail: {
				type: mongoose.Schema.Types.String,
				ref: 'student.email',
			},
		},
	],
});

module.exports = Teacher = mongoose.model('teacher', TeacherSchema);
