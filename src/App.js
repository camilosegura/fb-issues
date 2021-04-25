import React from 'react';
import logo from './logo.svg';
import issueService from './services/issueService';
import './App.css';

function App() {
  React.useEffect(() => {
    issueService.search('Add version to protocol used between backend/frontend')
      .then(({ data }) => {
        console.log('data', data);
      })
      .catch(e => console.log('ERROR: ', e));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => issueService.nextPage()}>Load</button>
      </header>
    </div>
  );
}

export default App;
