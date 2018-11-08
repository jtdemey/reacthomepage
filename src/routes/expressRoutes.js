import express from 'express';
import path from 'path';

import gameSuite from '../app/gamesuite/gameSuite';
import logger from '../app/logWriter';

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '/../public/html/home.html'));
  });

router.route('/survive')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '/../public/html/survive.html'));
  });

router.route('/gamesuite')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '/../public/html/lobby.html'));
  });

router.route('/gamesuite/imposter/:gameCode')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '/../public/html/imposter.html'));
  });

router.route('/gamesuite/pistolwhip')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '/../public/html/pistolwhip.html'));
  });

router.route('/roleroller')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '/../public/html/roleroller.html'));
  });

router.route('/gamesuite/scripts/makeGame')
  .post(gameSuite.lobbyCreate);

router.route('/gamesuite/scripts/joinGame')
  .post(gameSuite.lobbyJoin);

export default router;