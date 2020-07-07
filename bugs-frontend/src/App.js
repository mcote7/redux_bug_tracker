import React from 'react';
// import Bugs from './components/bugs';
import './App.css';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import bugsList from './components/bugsList';

const store = configureStore();

function App() {
  return (
    <Provider value={store}>
      {/* <Bugs/> */}
      <bugsList/>
    </Provider>
  );
};

export default App;
