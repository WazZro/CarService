const keystone = require('keystone');

const { Types } = keystone.Field;
const Engineer = new keystone.List('Engineer', {
	inherits: keystone.list('User'),
});

Engineer.add({
	startDate: {
		label: 'Дата начала работы',
		type: Types.Date,
		initial: true,
		required: true,
		index: true,
	},
	startWorkingHour: {
		type: Types.Select,
		options: '0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23',
		required: true,
		initial: true,
		index: true,
	},
	endWorkingHour: {
		type: Types.Select,
		options: '0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23',
		required: true,
		initial: true,
		index: true,
	},
	workload: {
		type: Types.Select,
		options: '0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23',
	},
});

Engineer.register();
