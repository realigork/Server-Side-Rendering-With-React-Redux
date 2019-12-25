import 'babel-polyfill';
import express from 'express';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
const app = express();

// Tell Express to use 'public' folder as the one available
// to show to the outside world from which it will download
// bundle.js
app.use(express.static('public'));

app.get('*', (req, res) => {
  const store = createStore();
  // Some logic to initialise and load data into the store
  res.send(renderer(req, store));
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
