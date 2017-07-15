import Express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import favicon from 'serve-favicon';
import compression from 'compression';
import http from 'http';
import proxy from 'express-http-proxy';
import path from 'path';
import url from 'url';
import {Provider} from 'react-redux';
import {StaticRouter, matchPath} from 'react-router';
import config from './config';
import configureStore from './store/configureStore';
import Html from './helpers/Html';
import extractRoutes from './helpers/router';
import getRoutes from './routes';
import waitAll from './sagas/waitAll';

const app = new Express();
const server = new http.Server(app);

// disable `X-Powered-By` HTTP header for better security
app.disable('x-powered-by');

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));
app.use(Express.static(path.join(__dirname, '..', 'static')));

// Proxy to API
app.use('/api', proxy(config.apiBaseUrl, {
  // eslint-disable-next-line
  forwardPath: (req, res) => url.parse(req.url).path
}));

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh();
  }

  const store = configureStore();
  const allRoutes = getRoutes(store);
  const assets = webpackIsomorphicTools.assets();

  function hydrateOnClient() {
    const htmlComponent = <Html assets={assets} store={store} />;
    const renderedDomString = ReactDOMServer.renderToString(htmlComponent);
    res.send(`<!doctype html>\n ${renderedDomString}`);
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  // SSR
  const context = {};
  const rootComponent = (
    <Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        {allRoutes}
      </StaticRouter>
    </Provider>
  );

  // get a current route and preload all the data for it
  const extractedRoutes = extractRoutes(allRoutes);
  const filtered = [];
  extractedRoutes.forEach((route) => {
    const match = matchPath(req.url, {
      path: route.path,
      exact: true,
      strict: false
    });
    // ignore wildcard since it's usually used for 404 page
    if (match && (match.path !== '*')) {
      filtered.push({match, component: route.component});
    }
  });

  // extract proloaders for the route
  const preloaders = filtered
    .filter(({component}) => component && component.preload)
    .map(({match, component}) => component.preload(match.params, req))
    .reduce((result, preloader) => result.concat(preloader), []);
  const runTasks = store.runSaga(waitAll(preloaders));
  global.navigator = {userAgent: req.headers['user-agent']};

  // once saga is done with data loading, render the page and send it to the browser
  runTasks.done.then(() => {
    if (context.url) {
      res.redirect(context.url);
    } else {
      const htmlComponent = <Html assets={assets} component={rootComponent} store={store} />;
      const renderedDomString = ReactDOMServer.renderToString(htmlComponent);
      res.status(200).send(`<!doctype html>\n ${renderedDomString}`);
      store.close();
    }
  }).catch((e) => {
    // TODO: use a 3rd party library for logging
    console.log(e.stack);
  });
});

// start the server
if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
