import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Home from './pages/Home/index.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function render() {
  ReactDOM.render(<Home />, document.getElementById("root"));
}

render();