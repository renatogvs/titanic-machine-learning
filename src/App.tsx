import React from 'react'
import { default as data } from './data/train.json'
import { default as test } from './data/test.json'


import * as tf from '@tensorflow/tfjs';

import './App.css';
import { TablePerson } from './TablePerson'

export class App extends React.Component<AppProps, AppState> {


  constructor(props: any) {
    super(props);

    this.state = {
      persons: [],
      personsTest: [],
      isTfReady: false,
      consoleText: ""
    }

  }

  async componentDidMount() {

    // Wait for tf to be ready.
    await tf.ready();

    // Signal to the app that tensorflow.js can now be used.
    this.setState({
      isTfReady: true,
    });

    let personsJson = data.map((personJson: any) => {
      let person: Person = {
        id: personJson.PassengerId,
        name: personJson.Name,
        survived: personJson.Survived !== 0 ? "True" : "False",
        pclass: personJson.Pclass,
        sex: personJson.Sex,
        age: typeof personJson.Age === 'number' ? personJson.Age : 0,
        sibSp: personJson.SibSp,
        parch: personJson.Parch,
        ticket: '' + personJson.Ticket,
        fare: personJson.Fare,
        cabin: personJson.Cabin,
        embarked: personJson.Embarked
      }

      return person
    });

    let personsTestJson = test.map((personJson: any) => {
      let person: Person = {
        id: personJson.PassengerId,
        name: personJson.Name,
        survived: "Not predicted",
        pclass: personJson.Pclass,
        sex: personJson.Sex,
        age: typeof personJson.Age === 'number' ? personJson.Age : 0,
        sibSp: personJson.SibSp,
        parch: personJson.Parch,
        ticket: '' + personJson.Ticket,
        fare: personJson.Fare,
        cabin: personJson.Cabin,
        embarked: personJson.Embarked
      }

      return person
    });

    this.setState(prevState => ({
      persons: personsJson,
      personsTest: personsTestJson
    }))

  }

  doPrediction = () => {
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [7], units: 32 }));
    model.add(tf.layers.dense({ inputShape: [32], units: 32 }));
    model.add(tf.layers.dense({ inputShape: [32], units: 1 }));


    model.compile({
      optimizer: 'sgd',
      loss: 'meanSquaredError',
      metrics: ['accuracy']
    });

    let personsJsonNormalized = data.map((personJson: any) => {
      let person = [
        personJson.Pclass,
        personJson.Sex === 'male' ? 0 : 1,
        typeof personJson.Age === 'number' ? personJson.Age / 99 : 0,
        personJson.SibSp,
        personJson.Parch,
        personJson.Fare / 600,
        personJson.Embarked === 'C' ? 1 : personJson.Embarked === 'Q' ? 2 : 0
      ]

      return person
    });

    let tensorPersons = tf.tensor(personsJsonNormalized)

    let personsResultJsonNormalized = data.map((personJson: any) => {
      return personJson.Survived
    });

    let personsResult = tf.tensor(personsResultJsonNormalized)

    // Train for 5 epochs with batch size of 32.
    model.fit(tensorPersons, personsResult, {
      epochs: 10,
      callbacks: {
        onBatchEnd: (batch: any, logs: any) => {
          this.setState((prevState) => ({
            consoleText: "Accuracy: " + (logs.acc * 100).toFixed(2) + "% Batch: " + (batch + 1) + "\r\n" + prevState.consoleText
          }))
        },
        onEpochEnd: (epoch, logs) => {
          this.setState((prevState) => ({
            consoleText: "Epoch: " + (epoch + 1) + "\r\n" + prevState.consoleText
          }))
        }
      }
    }).then(info => {

      let toPredict = test.map((personJson: any) => {
        let person = [
          personJson.Pclass,
          personJson.Sex === 'male' ? 0 : 1,
          typeof personJson.Age === 'number' ? personJson.Age / 99 : 0,
          personJson.SibSp,
          personJson.Parch,
          personJson.Fare / 600,
          personJson.Embarked === 'C' ? 1 : personJson.Embarked === 'Q' ? 2 : 0
        ]

        return person
      });

      let result: tf.TypedArray = (model.predict(tf.tensor(toPredict)) as tf.Tensor).dataSync()

      let resultTest = Array.from(result).map((resultValue: any, index: number) => {

        let personTest = this.state.personsTest[index]
        let percent = (Math.round(resultValue * 100))
        personTest.survived = (percent >= 0 ? percent : 0) + '%';

        return personTest
      })

      this.setState({ personsTest: resultTest })

    });


  }



  render = () => {
    return (
      <div className="App">
        <h1>Training table</h1>
        <TablePerson persons={this.state.persons} resultTitle="Survival" />

        <h1>Test table</h1>
        <TablePerson persons={this.state.personsTest} resultTitle="Survival prediction" />

        <button onClick={this.doPrediction}>Train</button>
        <textarea id="console" name="console" rows={4} cols={50} defaultValue={this.state.consoleText} />
      </div>
    );

  }

};

interface AppProps {

};

interface AppState {
  persons: Person[]
  personsTest: Person[]
  isTfReady: boolean
  consoleText: string
}

interface Person {
  id: number
  name: string
  survived: string
  pclass: number
  sex: string
  age: number
  sibSp: number
  parch: string
  ticket: string
  fare: number
  cabin: string
  embarked: string
}
