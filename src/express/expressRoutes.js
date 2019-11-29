import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({
  silent: true
});
import createConnectBot from '../dal/connectBot';

const router = express.Router();
const isProd = process.env.NODE_ENV === 'production';

router.all('/imposter/*', cors());

const sendHtmlFile = (res, devDir, prodDir) => {
  if(isProd) {
    res.sendFile(path.join(process.cwd(), 'dist/public', prodDir));
  } else {
    res.sendFile(path.join(process.cwd(), 'src', devDir));
  }
};

router.route('/')
  .get((req, res) => {
    sendHtmlFile(res, 'homepage/home.html', 'home.html');
  });

router.route('/about')
  .get((req, res) => {
    sendHtmlFile(res, 'about/about.html', 'about.html');
  });

router.route('/contact')
  .post((req, res) => {
    const contact = JSON.parse(req.body);
    const cb = createConnectBot();
    cb.submitContactReq({...contact});
    res.sendStatus(201);
  });

router.route('/imposter')
  .get((req, res) => {
    sendHtmlFile(res, 'imposter/imposter.html', 'imposter.html');
  });

router.route('/imposter/:gameCode')
  .get((req, res) => {
    sendHtmlFile(res, 'imposter/imposter.html', 'imposter.html');
  });

router.route('/survive')
  .get((req, res) => {
    sendHtmlFile(res, 'survive/survive.html', 'survive.html');
  });

router.route('/pistolwhip')
  .get((req, res) => {
    sendHtmlFile(res, 'pistolwhip/pistolwhip.html', 'pistolwhip.html');
  });

router.route('/roleroller')
  .get((req, res) => {
    sendHtmlFile(res, 'static/roleroller.html', 'roleroller.html');
  });

router.route('/sandbox')
  .get((req, res) => {
    sendHtmlFile(res, 'static/sandbox.html', isProd);
  });

export default router;