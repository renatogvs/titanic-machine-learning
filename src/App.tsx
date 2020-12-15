import React from 'react'
import ReactDOM from 'react-dom'
import {default as data} from './data/train.json'

import './App.css';

export class App extends React.Component {

  render = () => {

    const table = data.map(( data )  => {
      return <p key={data.PassengerId}>{data.Name}</p>
    });

    return (
      <div className="App">
        {table}
      </div>
    );

  }

};

