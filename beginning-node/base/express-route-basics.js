'use strict';

const {express, PORT, bodyParser} = require('../config/express-app-config');

//An in memory collection of items;
let items = [];

//Create a Router
let router = express.Router();
router.use(bodyParser());

//Setup the collection routes;
router.route('/')
		.get((req, res, next) => {
			res.send({
				status: 'Items found',
				items: items
			});
		}).post((req, res, next) => {
			items.push(req.body);
			res.send({
				status: 'Item added',
				itemId: items.length - 1
			});
		}).put((req, res, next) => {
			items.req.body;
			res.send({
				status: 'Items replaces'
			});
		}).delete((req, res, next) => {
			items = [];
			res.send({
				status: 'Item cleared'
			});
		});

//Setup the item routes
router.route('/:id')
		.get((req, res, next) => {
			let id = req.params['id'];
			let index = Number(id);
			if(id && items[index]){
				res.send({
					status: 'Item found',
					item: items[index]
				});
			}else{
				res.send(404, {
					status: 'Not found'
				});
			}
		}).all((req, res, next) => {
			res.send(501, {
				status: 'Not implemented'
			})
		});
//Use the router
let app = express().use('/todo', router)
		.listen(PORT);
console.log('server running on port', PORT);
