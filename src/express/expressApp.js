//DEPENDENCIES
import path from 'path';
import express from 'express';
import serverLogger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

//LOCAL DEPENDENCIES
import expressRoutes from './expressRoutes';

//CONFIGURATION
const isProd = process.env.NODE_ENV === 'production';
const filePrefix = process.env.NODE_ENV === 'development' ? 'src' : 'dist/public';

//RATE LIMITS
const baseRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: 'Too many requests; try again later'
});
const contactRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: 'Too many requests; try again later'
});

const app = express();
app.use(serverLogger('short'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), filePrefix))); //DEVELOPMENT //PRODUCTION
app.use('/', expressRoutes);
app.use('/', baseRateLimiter);
app.use('/contact', contactRateLimiter);

//404
app.use((req, res, next) => {
  res.status(404);
  if(req.accepts('html')) {
    const notFoundFile = isProd ? `${filePrefix}/404page.html` : `${filePrefix}/errors/404page.html`;
    res.type('text/html').sendFile(path.join(process.cwd(), notFoundFile));
    return;
  }
  if(req.accepts('json')) {
    res.type('application/json').send({ error: '404 Not found' });
    return;
  }
  res.type('text/plain').send("404: This isn't the page you're looking for.");
  next();
});

//Render errors
app.use((err, req, res, next) => {
  res.status(500)
  if(req.accepts('html')) {
    const errFile = isProd ? `${filePrefix}/errorpage.html` : `${filePrefix}/errors/errorpage.html`;
    res.type('text/html').sendFile(path.join(process.cwd(), errFile));
    return;
  }
  if(req.accepts('json')) {
    res.type('application/json').send({ error: '500 Internal Server Error' });
    return;
  }
  res.type('text/plain').send('500: Internal Server Error');
  next();
});

export default app;