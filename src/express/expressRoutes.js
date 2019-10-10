import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({
  silent: true
});

const router = express.Router();
const isProd = process.env.NODE_ENV === 'production';

router.all('/imposter/*', cors());

const sendCssFile = (res, devDir, prodDir) => {
  if(isProd) {
    res.sendFile(path.join(process.cwd(), 'dist', prodDir));
  } else {
    res.sendFile(path.join(process.cwd(), 'src' + devDir));
  }
};

const sendHtmlFile = (res, devDir, prodDir) => {
  if(isProd) {
    res.sendFile(path.join(process.cwd(), 'dist', prodDir));
  } else {
    res.sendFile(path.join(process.cwd(), 'src', devDir));
  }
};

router.route('/')
  .get((req, res) => {
    console.log(req.headers);
    sendHtmlFile(res, 'homepage/home.html', isProd);
  });

router.route('/css')
  .get((req, res) => {
    console.log('yesh');
    sendCssFile(res, 'homepage/home.css', isProd);
  });

router.route('/imposter')
  .get((req, res) => {
    sendHtmlFile(res, 'imposter/imposter.html', isProd);
  });

router.route('/imposter/:gameCode')
  .get((req, res) => {
    sendHtmlFile(res, 'imposter/imposter.html', isProd);
  });

router.route('/survive')
  .get((req, res) => {
    sendHtmlFile(res, 'survive/survive.html', isProd);
  });

router.route('/pistolwhip')
  .get((req, res) => {
    sendHtmlFile(res, 'pistolwhip/pistolwhip.html', isProd);
  });

router.route('/roleroller')
  .get((req, res) => {
    sendHtmlFile(res, 'static/roleroller.html', isProd);
  });

router.route('/sandbox')
  .get((req, res) => {
    sendHtmlFile(res, 'static/sandbox.html', isProd);
  });

export default router;