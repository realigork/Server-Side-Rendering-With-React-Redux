import 'babel-polyfill';
import express from 'express';
import proxy from 'express-http-proxy';
import { matchRoutes } from 'react-router-config';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

// Redirect any requests to /api
app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
  proxyReqOptDecorator(opts) {
    // Used for Google's oauth 
    opts.headers['x-forwarded-host'] = 'localhost:3000';
    return opts;
  }
}));

// Tell Express to use 'public' folder as the one available
// to show to the outside world from which it will download
// bundle.js
app.use(express.static('public'));

app.get('*', (req, res) => {
  const store = createStore(req);

  // Some logic to initialise and load data into the store.
  // Extract 'route' using destructuring
  const promises = matchRoutes(Routes, req.path).map((({ route }) => {
    return route.loadData ? route.loadData(store) : null;
  }));

  Promise.all(promises).then(() => {
    res.send(renderer(req, store));
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
