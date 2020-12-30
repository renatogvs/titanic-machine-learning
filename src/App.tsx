import React from 'react'
import update from 'react-addons-update'
import {default as data} from './data/train.json'
import {default as test} from './data/test.json'


import * as tf from '@tensorflow/tfjs';

import './App.css';
import { TablePerson } from './TablePerson'

export class App extends React.Component<AppProps, AppState> {


  constructor(props:any) {
    super(props);
    
    this.state = {
      data: data,
      test: test,
      persons: [],
      personsTest: [],
      renderCount: 0,
      isTfReady: false,
      consoleText: ""
    }

  }

  async componentDidMount() {
    //maxFare = 0

      // Wait for tf to be ready.
      await tf.ready();

      // Signal to the app that tensorflow.js can now be used.
      this.setState({
        isTfReady: true,
      });

    this.setState(prevState => ({
      renderCount: prevState.renderCount + 1
    }))

    let personsJson = this.state.data.map((personJson:any) => {
      let person = {
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
      }

      return person
    });

    let personsTestJson = this.state.test.map((personJson:any) => {
      let person = {
        id: personJson.PassengerId,
        name: personJson.Name,
        survived: 0,
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
    model.add(tf.layers.dense({inputShape: [7], units: 32}));
    model.add(tf.layers.dense({inputShape: [32], units: 32}));
    model.add(tf.layers.dense({inputShape: [32], units: 1}));


    model.compile({
      optimizer: 'sgd',
      loss: 'meanSquaredError',
      metrics: ['accuracy']
    });

    let personsJsonNormalized = this.state.data.map((personJson:any) => {
      let person = [
        personJson.Pclass,
        personJson.Sex === 'male' ? 0 : 1,
        typeof personJson.Age === 'number' ? personJson.Age / 99 : 0,
        personJson.SibSp,
        personJson.Parch,
        personJson.Fare / 600,
        personJson.Embarked === 'C' ? 1 : personJson.Embarked === 'Q' ? 2: 0
      ]

      return person
    });

    personsJsonNormalized = tf.tensor(personsJsonNormalized)

    let personsResultJsonNormalized = this.state.data.map((personJson:any) => {
      return personJson.Survived
    });

    personsResultJsonNormalized = tf.tensor(personsResultJsonNormalized)

    // Train for 5 epochs with batch size of 32.
    model.fit(personsJsonNormalized, personsResultJsonNormalized,  {
       epochs: 10,
       callbacks: {onBatchEnd:  (batch:any, logs:any) => {
         this.setState((prevState) => ({
           consoleText: "Accuracy: " + (logs.acc * 100) + "% Batch: " + (batch + 1) + "\r\n" + prevState.consoleText
         }))
       },
       onEpochEnd: (epoch, logs) => {
        this.setState((prevState) => ({
          consoleText: "Epoch: " + (epoch + 1) + "\r\n" + prevState.consoleText
        }))
       }}
     }).then(info => {

       let toPredict = test.map((personJson:any) => {
        let person = [
          personJson.Pclass,
          personJson.Sex === 'male' ? 0 : 1,
          typeof personJson.Age === 'number' ? personJson.Age / 99 : 0,
          personJson.SibSp,
          personJson.Parch,
          personJson.Fare / 600,
          personJson.Embarked === 'C' ? 1 : personJson.Embarked === 'Q' ? 2: 0
        ]
  
        return person
      });
  
      let result: tf.TypedArray = (model.predict(tf.tensor(toPredict)) as tf.Tensor).dataSync()

      Array.from(result).map((resultValue:any, index:number) => {
        
        let personTest:any = this.state.personsTest[index]

        let person = {
          id: personTest.id,
          name: personTest.name,
          survived: (Math.round(resultValue * 100)).toFixed(2) + '%',
          pclass: personTest.pclass,
          sex: personTest.sex,
          age: personTest.age,
          sibSp: personTest.sibSp,
          parch: personTest.parch,
          ticket: personTest.ticket,
          fare: personTest.fare,
          cabin: personTest.cabin,
          embarked: personTest.embarked
        }

        this.setState(update(this.state, {
          personsTest: {
            [index]: {
              $set: person
            }
          }
        }))

        return person
      })


     });


  }

  

  render = () => {
    return (
      <div className="App">
        <h1>Training table</h1>
        <TablePerson persons={this.state.persons} />

        <h1>Test table</h1>
        <TablePerson persons={this.state.personsTest} />

        <button onClick={this.doPrediction}>Train</button>
        <textarea id="console" name="console" rows={4} cols={50} defaultValue={this.state.consoleText}/>
      </div>
    );

  }

};

interface AppProps {

};

interface AppState {
  persons: []
  personsTest: []
  renderCount: number
  data: any
  test: any
  isTfReady: boolean
  consoleText: string
}