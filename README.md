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


## 4 Big Redux Challenges
1. Redux needs different config on browser vs server.
Solution: You will need 2 different stores: browser and server.

2. Aspects of authentication needs to be handled on server. Normally this is only on browser! - This is done through the use of cookies. No cookies on the server.

3. Need some way to detect when all initial data load action creators are completed on server, so we can then put the app into a string and render it on user's browser. Component lifecycle methods such as `componentDidMount` don't work on the server.
Solution: look at the requested URL and figure out which components will be rendered. Use `matchRoutes` from `react-router-config` to detect current routes and components that will be rendered through Express. Call a method to load data attached to those components.

4. Need state rehydration on the browser.


Check documentation for React Router Config that works with SSR.
https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config


## Authentication

Server needs to be aware of the user state so it can make initial requests to the API (e.g. when user is logged in and we need to send a request, the server needs to know that user is authenticated, through cookie, json token, etc). After the initial request we then use a Proxy server that would act as a browser to send requests to the API.

Use cookies to pass the specific state because they are attached automatically to the domain. Whereas with JSON token you would have to attach manually.


### Traditional approach

Browser makes direct calls to the API.

```
Browser - API
```

### SSR approach

Server needs to make initial request to the API. Then, Proxy server is used to send requests on behalf of the browser.

```
Browser - Server (includes Proxy) - API
```


## API

https://react-ssr-api.herokuapp.com/
