const keystone = require('keystone');

// eslint-disable-next-line prefer-destructuring
const Types = keystone.Field.Types;

/**
 * Car Model
 * ==========
 */
const Service = new keystone.List('Service');

Service.add({
	name: { 
		type: Types.Text,
		required: true,
		index: true,
		initial: true,
	},
	cost: { 
		type: Types.Number,
		required: true,
		index: true,
		initial: true,
	},
});
/**
 * Registration
 */
Service.defaultColumns = 'name, cost';
Service.register();
