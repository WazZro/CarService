const keystone = require('keystone');

// eslint-disable-next-line prefer-destructuring
const Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
const User = new keystone.List('User');

User.add(
	{
		name: { type: Types.Name, required: true, index: true },
		email: {
			type: Types.Email,
			initial: true,
			required: true,
			unique: true,
			index: true,
		},
		password: { type: Types.Password, initial: true, required: true },
		cars: {
			type: Types.Relationship,
			ref: 'Car',
			many: true,
			required: false,
		},
	},
	'Permissions',
	{
		isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
	}
);

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});

User.schema.set('usePushEach', true);

/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();
