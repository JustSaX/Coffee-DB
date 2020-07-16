import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { defineCustomElements } from '@ionic/pwa-elements/loader'; // for camera

import { StateProvider } from '../src/components/backend/store'

//import { LoadData} from '../src/components/backend/loadData'

defineCustomElements(window); // for camera

//LoadData()  // loading Settings and Data into global hook

// for globel State:
const app = (
    <StateProvider>
        <App/>
    </StateProvider>
)

console.log('************ INDEX ******************')


ReactDOM.render(app, document.getElementById('root'));




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
