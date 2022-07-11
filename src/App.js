import React, { Fragment } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import './App.css';

export default function App() {
  const routeComponents = routes.map(({ path, component }, key) => (
    <Route exact path={path} element={component} key={key} />
  ));

  return (
    <>
      <Fragment>
        <div className="App">
          <BrowserRouter>
            <Routes>{routeComponents}</Routes>
          </BrowserRouter>
        </div>
      </Fragment>
    </>
  );
}
