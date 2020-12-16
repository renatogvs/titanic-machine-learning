import React from 'react'
import {default as data} from './data/train.json'
import { Person } from './entity/Person'

import './App.css';
import { TablePerson } from './TablePerson';

export class App extends React.Component {

  render = () => {


    const personsJson = data.map((personJson) => {
      let person = new Person({name: personJson.Name, id: personJson.PassengerId})

      return person
    });

    

    


    return (
      <div className="App">
        <TablePerson persons={personsJson} />
      </div>
    );

  }

};

