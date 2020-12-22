import React from 'react'
import {default as data} from './data/train.json'
import { Person } from './entity/Person'

import './App.css';
import { TablePerson } from './TablePerson';

export class App extends React.Component {

  render = () => {

    const personsJson = data.map((personJson) => {
      let person = new Person({
        id: personJson.PassengerId,
        name: personJson.Name,
        survived: personJson.Survived !== 0,
        pclass: personJson.Pclass,
        sex: personJson.Sex,
        age: typeof personJson.Age === 'number' ? personJson.Age : 0,
        sibSp: personJson.SibSp,
        parch: personJson.Parch,
        ticket: '' + personJson.Ticket,
        fare: personJson.Fare,
        cabin: personJson.Cabin,
        embarked: personJson.Embarked
      })

      return person
    });

    return (
      <div className="App">
        <h1>Training table</h1>
        <TablePerson persons={personsJson} />
      </div>
    );

  }

};

