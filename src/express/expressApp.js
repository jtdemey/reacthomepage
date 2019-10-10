//DEPENDENCIES
import path from 'path';
import express from 'express';
import serverLogger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

//LOCAL DEPENDENCIES
import expressRoutes from './expressRoutes';

//CONFIGURATION
const filePrefix = process.env.NODE_ENV === 'development' ? 'src' : 'dist';

const app = express();
app.use(serverLogger('short'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), filePrefix))); //DEVELOPMENT //PRODUCTION
app.use('/', expressRoutes);

//404
app.use((req, res, next) => {
  res.status(404);
  if(req.accepts('html')) {
    res.sendFile(path.join(process.cwd(), filePrefix + '/static/404page.html'));
    return;
  }
  if(req.accepts('json')) {
    res.send({ error: '404 Not found' });
    return;
  }
  res.type('txt').send("404: This isn't the page you're looking for.");
  next();
});

//Render errors
app.use((err, req, res, next) => {
  res.status(200);
  res.sendFile(path.join(process.cwd(), filePrefix + '/static/errorpage.html'));
  next();
});

export default app;