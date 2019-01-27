const keystone = require('keystone');

const User = keystone.list('User').model;
const Record = keystone.list('Record').model;
const Car = keystone.list('Car').model;
const Engineer = keystone.list('Engineer').model;
const Service = keystone.list('Service').model;
const middleware = require('./middleware');

keystone.pre('routes', middleware.initLocals);
keystone.pre('routes', middleware.requireUser);
keystone.pre('render', middleware.flashMessages);
const router = keystone.createRouter();
const workHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

router.get('/', async (req, res) => {
	const view = new keystone.View(req, res);
	const service = Service.find().exec();
	const userCarsPromise = User.findOne({
		_id: req.user._id
	}).populate('cars').exec();
	const recordsPromise = Record.find({
		customer: req.user._id
	}).populate('type car engineer').exec();
	const engineers = await Engineer.find().exec();

	view.render('index', {
		userCars: await userCarsPromise,
		records: await recordsPromise,
		engineers,
		service: await service,
	});
});

router.get('/checkdate', async (req, res) => {
	const {
		dateq,
		engineer
	} = req.query;

	try {
		const worker = await Engineer.findById(engineer).exec();
		const records = await Record.find({
			engineer,
			date: dateq
		}).exec();
		
		const free = workHours.filter(hour => {
			const startHour = Number(worker.startWorkingHour);
			const endHour = Number(worker.endWorkingHour);
	
			if ( hour < startHour || hour > endHour) return false;
			return !records.some(rec => hour === Number(rec.recordTime));
		});
	
		res.json(free);
	} catch (err) {
		console.log(err);
		res.sendStatus(400);
	}
	
});

router.post('/record', async (req, res) => {
	try {
		const record = new Record({
			name: req.body.name,
			customer: req.body.user,
			engineer: req.body.engineer,
			car: req.body.car,
			type: req.body.type,
			recordTime: req.body.recordTime,
			date: new Date(req.body.date),
		});
	
		try {
			await record.save();
		} catch (err) {
			console.log(err);
			res.sendStatus(500);
		}
		
		res.sendStatus(201);
	} catch (err) {
		console.log(err);
		res.sendStatus(400);
	}
});

router.delete('/record', async (req,res) => {
	const {
		record
	} = req.query;

	try {
		await Record.findById(record).remove();
		res.sendStatus(200);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
})

router.post('/auto', async (req, res) => {
	const carQuery = req.body;
	try {
		const user = await User.findById(req.user._id).exec();
		let car = await Car.findOne({
			model: carQuery.model,
			brand: carQuery.brand,
		}).exec();
		if (!car) {
			car = await new Car({
				model: carQuery.model,
				brand: carQuery.brand,
			}).save();
		}
		user.cars.push(car);
		await user.save();
		res.sendStatus(201);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}

});

module.exports = app => {
	app.use('/', router);
};
