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

  // Collect 'loadData' from page components and execute them.
  // Extract 'route' using destructuring.
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null;
  }).map(promise => {
    // Wrap all promises in another promise to force them as resolved.
    // This avoid issue with Node when there is an error fetching data and
    // promises will get terminated into catch.
    if (promise) {
      return new Promise((resolve, reject) => {
        promise.then(resolve).catch(resolve);
      })
    }
  });

  // Once all promises resolved successfully, try to render content
  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);

    // Trying to access blocked routes when JS is disabled
    // will produce a 'REPLACE' object. 
    // Manually handle of redirect.
    if (context.url) {
      return res.redirect(301, context.url);
    }

    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
