import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

import gameSuite from '../app/gamesuite/gameSuite';

const router = express.Router();
dotenv.config({
  silent: true
});
const isProd = process.env.NODE_ENV === 'production';

const sendHtmlFile = (res, filename, isProd) => {
  if(isProd) {
    res.sendFile(path.join(process.cwd(), 'dist/html/' + filename));
  } else {
    res.sendFile(path.join(process.cwd(), 'src/public/html/' + filename))
  }
};

router.route('/')
  .get((req, res) => {
    sendHtmlFile(res, 'home.html', isProd);
  });

router.route('/survive')
  .get((req, res) => {
    sendHtmlFile(res, 'survive.html', isProd);
  });

router.route('/gamesuite')
  .get((req, res) => {
    sendHtmlFile(res, 'lobby.html', isProd);
  });

router.route('/gamesuite/imposter/:gameCode')
  .get((req, res) => {
    sendHtmlFile(res, 'imposter.html', isProd);
  });

router.route('/gamesuite/pistolwhip')
  .get((req, res) => {
    sendHtmlFile(res, 'pistolwhip.html', isProd);
  });

router.route('/roleroller')
  .get((req, res) => {
    sendHtmlFile(res, 'roleroller.html', isProd);
  });

router.route('/sandbox')
  .get((req, res) => {
    sendHtmlFile(res, 'sandbox.html', isProd);
  });

router.route('/gamesuite/scripts/makeGame')
  .post(gameSuite.lobbyCreate);

router.route('/gamesuite/scripts/joinGame')
  .post(gameSuite.lobbyJoin);

export default router;