import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import {withTracking} from 'react-tracker'
import {getStudentUploadEvent} from './tracking/events/upload'
import Side from './Side'


class App extends React.Component {


  render() {
    return (
      <BrowserRouter>
        <Side />
      </BrowserRouter>
    );
    
  }
  
}

export default App;
