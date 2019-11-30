import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css"
import {studentUploadListener} from './tracking/listeners/upload'
import {TrackerProvider, Tracker} from 'react-tracker'
import App from './App';

import TagManager from 'react-gtm-module'
const tagManagerArgs = {
    gtmId: 'GTM-00000',
    dataLayer: {
        NewUploadBy: '',
        uploadName: ''
    }
}

TagManager.initialize(tagManagerArgs)

const tracker = new Tracker([studentUploadListener])

ReactDOM.render(
    <TrackerProvider tracker={tracker}>
        <App />
    </TrackerProvider>, 
    document.getElementById('root'));
