# Server Side Rendering With React Redux

An example of how Server Side Rendering works with React and Redux.

- Server Side Rendering - Generate HTML on the server
- Universal Javascript - The same code runs on the server and the browser (same module system used on server and browser)
- Isomorphic Javascript - The same code runs on the server and the browser (same module system used on server and browser)


## Problems setting up Server Side Rendering

Problem #1: JSX on the server.
Solution: Run Webpack on all of our server side code, then execure the bundle

Problem #2: Need to turn components into HTML.
Solution: use the `renderToString` from `react-dom/server` library

Problem #3: Loading Javascript so we can use event handlers, action creators, data loading requests, etc.
Solution: create two separate bundles for backend and the browser
  - Show initial server rendered HTML on the browser
  - Fetch a client bundle that will boot up React app 
  - Re-render the second time using that bundle which takes over the existing render app, binds event handlers, etc.

Problem #4: React Router on the server is not aware of the address bar.
Solution: Use **StaticRouter** on the server and **BrowserRouter** on the client


## Hot Reloading

Restart the server using `nodemon` every time there is a change to the `bundle.js`:

```node
"dev:server": "nodemon --watch build --exec \"node build/bundle.js\"",
```

- The `--watch` flag tells Node, which folder needs to be listened to for changes.
- The `--exec` flag tells Node, which function to execute when change happens.



