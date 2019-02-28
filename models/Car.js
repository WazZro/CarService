const keystone = require('keystone');


const { Types } = keystone.Field;

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
