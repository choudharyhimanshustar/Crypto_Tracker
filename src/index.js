import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import CreateContext from './components/CreateContext';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
ReactDOM.render(<CreateContext><App /></CreateContext>, document.getElementById("mydiv"))