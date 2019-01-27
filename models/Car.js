const keystone = require('keystone');

// eslint-disable-next-line prefer-destructuring
const Types = keystone.Field.Types;

/**
 * Car Model
 * ==========
 */
const Car = new keystone.List('Car');

Car.add({
	model: { 
		type: Types.Text,
		required: true,
		index: true,
		initial: true,
	},
	brand: { 
		type: Types.Text,
		required: true,
		index: true,
		initial: true,
	},
});
/**
 * Registration
 */
Car.schema.virtual('name').get(function () {
	return `${this.brand} ${this.model}`;
});


Car.defaultColumns = 'brand, model';
Car.register();
