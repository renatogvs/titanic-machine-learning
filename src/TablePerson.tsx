import React from 'react'

import { TableCR } from './TableCR'

export class TablePerson extends React.Component<ITablePersonProps, ITablePersonState> {

  listElementsTable = (person: any[]) => {
    const dataState = person.map((person) => {
      return [person.id, person.name, person.sex,
      person.age, person.pclass, person.sibSp, person.parch,
      person.ticket, person.fare, person.cabin, person.embarked, '' + person.survived]
    })

    return dataState
  }

  render = () => {

    return (
      <div>
        <TableCR header={["Id", "Name", "Sex", "Age", "Ticket class", 
      "Siblings/spouses aboard", "Parents/children aboard", "Ticket number",
      "Fare", "Cabin number", "Port of Embarkation", this.props.resultTitle]}
       tableData={this.listElementsTable(this.props.persons)} />
      </div>
    );

  }

};

interface ITablePersonState {
  data: any
}

interface ITablePersonProps {
  persons: any[]
  resultTitle: string
}