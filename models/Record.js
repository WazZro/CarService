const keystone = require('keystone');

// eslint-disable-next-line prefer-destructuring
const Types = keystone.Field.Types;

/**
 * Car Model
 * ==========
 */
const Record = new keystone.List('Record');

Record.add({
	name: { 
		type: Types.Text,
		required: true,
		index: true,
		initial: true,
    },
    done: {
        type: Types.Boolean,
        required: true,
        default: false,
    },
    type: {
        type: Types.Relationship,
        ref: 'Service',
        required: true,
        initial: true,
    },
    recordDate: {
        type: Types.Datetime,
        required: true,
        default: Date.now(),
        utc: true,
    },
    date: {
        type: Types.Date,
        required: true,
        initial: true,
        utc: true,
    },
    time: {
        type: Types.Number,
        // required: true,
        // initial: true,
    },
    customer: {
        type: Types.Relationship,
        required: true,
        initial: true,
        index: true,
        ref: 'User',
    },
    car: {
        type: Types.Relationship,
        required: true,
        initial: true,
        index: true,
        ref: 'Car',
    },
    engineer: {
        type: Types.Relationship,
        required: true,
        initial: true,
        index: true,
        ref: 'Engineer',
    },
    recordTime: {
        type: Types.Select,
        required: true,
        initial: true,
        index: true,
		options: '0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23',
	},
});
/**
 * Registration
 */
Record.defaultColumns = 'name, customer, done, type, date, recordTime, engineer';
Record.register();
