import express from 'express';
import renderer from './helpers/renderer';

const app = express();

// Tell Express to use 'public' folder as the one available
// to show to the outside world from which it will download
// bundle.js
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(renderer(req));
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
