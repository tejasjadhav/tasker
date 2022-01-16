import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path=":noteId" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  ), document.getElementById('root'),
);
