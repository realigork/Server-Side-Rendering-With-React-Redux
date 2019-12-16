# Server Side Rendering With React Redux

An example of how Server Side Rendering works with React and Redux.

- Server Side Rendering - Generate HTML on the server
- Universal Javascript - The same code runs on the server and the browser (same module system used on server and browser)
- Isomorphic Javascript - The same code runs on the server and the browser (same module system used on server and browser)


## Problems setting up Server Side Rendering

1. JSX on the server - Run Webpack on all of our server side code, then execure the bundle

2. Need to turn components into HTML - use the `renderToString` from `react-dom/server` library


## Hot Reloading

Restart the server using `nodemon` every time there is a change to the `bundle.js`:

```node
"dev:server": "nodemon --watch build --exec \"node build/bundle.js\"",
```

- The `--watch` flag tells Node, which folder needs to be listened to for changes.
- The `--exec` flag tells Node, which function to execute when change happens.



