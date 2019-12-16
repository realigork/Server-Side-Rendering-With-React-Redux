import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import Home from './client/components/Home';

const app = express();

// Tell Express to use 'public' folder as the one available
// to show to the outside world from which it will download
// bundle.js
app.use(express.static('public'));

app.get('/', (req, res) => {
  const content = renderToString(<Home />);

  // Tell Express to download the public bundle
  const html = `
    <html>
      <head></head> 
      <body>
        <div>${content}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;

  res.send(html);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
