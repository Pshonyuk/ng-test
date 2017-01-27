import express = require('express');
import Router = express.Router;
import Request = express.Request;
import Response = express.Response;

import { UserModel } from '../models/User';
import { logger } from '../logger';

export module errorsData {
	export const CONFIRM_PASSWORD = {
		field: 'confirmPassword',
		type: 'confirm'
	};

	export const DUPLICATED_EMAIL = {
		field: 'email',
		type: 'duplicated'
	};

	export const UNKNOWN = {
		type: 'unknown'
	};
}


export const path: string = '/api/users';

export const action = (app) => {
	const router = Router();

	router.use((req: Request, res: Response, next) => {
		next();
	});

	router.post('/', (req: Request, res: Response) => {
		if (req.body.password !== req.body.confirmPassword) {
			res.json({ error: errorsData.CONFIRM_PASSWORD });
			return;
		}

		new UserModel(req.body).save().then(() => {
			res.json({});
		}).catch((err) => {
			if (err.name === 'ValidationError' && err.errors && err.errors.email) {
				res.json({ error: errorsData.DUPLICATED_EMAIL });
				return;
			}

			logger.error(JSON.stringify(err));
			res.json({ error: errorsData.UNKNOWN });
		});
	});

	router.get('/', (req: Request, res: Response) => {
		logger.info('test get');
		res.json({ test: 'get' });
	});

	return router;
};