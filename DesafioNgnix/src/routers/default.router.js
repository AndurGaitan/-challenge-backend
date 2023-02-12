import express from 'express';
import { destroyCredentials } from '../controllers/session.controller.js';
import { renderSystemInfo } from '../controllers/app.controller.js';
import { auth } from '../utils/authentication.js';

const DEFAULT_ROUTER = express.Router();

DEFAULT_ROUTER
    .get("", auth, (req, res) => { res.render('index', { script: 'main', user: req.user[0].username }) })
    .get('logout', destroyCredentials)
    .get('info', renderSystemInfo)

export { DEFAULT_ROUTER }