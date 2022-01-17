import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './app/App';
import notes from './state/store';

ReactDOM.render(
  (
    <Provider store={notes}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path=":noteId" element={<App />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root'),
);
