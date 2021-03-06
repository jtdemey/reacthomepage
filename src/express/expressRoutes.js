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

router.post('/contact', (req, res) => {
  const c = req.body;
  const cb = createConnectBot();
  cb.submitContactReq(c.name, c.inquiry, c.hash);
  res.status(201);
  res.json({
    status: 'success'
  });
});

router.route('/doodles')
  .get((req, res) => {
    sendHtmlFile(res, 'doodles/doodles.html', 'doodles.html');
  });

router.route('/imposter')
  .get((req, res) => {
    sendHtmlFile(res, 'imposter/imposter.html', 'imposter.html');
  });

router.route('/imposter/:gameCode')
  .get((req, res) => {
    sendHtmlFile(res, 'imposter/imposter.html', 'imposter.html');
  });

router.route('/meyhemn')
  .get((req, res) => {
    sendHtmlFile(res, 'meyhemn/meyhemn.html', 'meyhemn.html');
  });

router.route('/pistolwhip')
  .get((req, res) => {
    sendHtmlFile(res, 'pistolwhip/pistolwhip.html', 'pistolwhip.html');
  });

router.route('/resume')
  .get((req, res) => {
    sendHtmlFile(res, 'media/resume.html', 'media/resume.html');
  });

router.route('/rollfighter')
  .get((req, res) => {
    sendHtmlFile(res, 'rollfighter/rollfighter.html', 'rollfighter.html');
  });

router.route('/sandbox')
  .get((req, res) => {
    sendHtmlFile(res, 'sandbox/sandbox.html', 'sandbox.html');
  });

router.route('/survive')
  .get((req, res) => {
    sendHtmlFile(res, 'survive/survive.html', 'survive.html');
  });

router.route('/devtut')
  .get((req, res) => {
    sendHtmlFile(res, 'webdevtut/tut.html', 'tut.html');
  });

export default router;