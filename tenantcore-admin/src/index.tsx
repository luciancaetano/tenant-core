import React from 'react';
import {render} from 'react-dom';
import App from './configurestore';
// import registerServiceWorker from './registerServiceWorker';

// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Import Main styles for this application
import './styles/index.css';

render(<App/>, document.getElementById('root'));
// registerServiceWorker();

console.log(gql`
{
  user(id: 5) {
    firstName
    lastName
  }
}
`);