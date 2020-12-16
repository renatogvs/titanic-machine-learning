import React from 'react'

import {Person} from './entity/Person'

export class TablePerson extends React.Component<ITablePerson> {

  constructor(props: ITablePerson) {
    super(props);
  }

  render = () => {

    return (
        <table>
          <tr>
              <td>Id</td>
              <td>Name</td>
          </tr>
          {this.props.persons.map((value, index) => {
            return (
          <tr>
              <td>{value.id}</td>
              <td>{value.name}</td>
            </tr>
            );
          })}
        </table>
    );

  }

};

interface ITablePerson {
  persons: Person[];
}
