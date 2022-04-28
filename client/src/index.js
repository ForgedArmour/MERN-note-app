import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NoteStates from './context/notes/NoteStates';

ReactDOM.render(
  <React.StrictMode>
    <NoteStates>
      <App />
    </NoteStates>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
