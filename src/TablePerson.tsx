import React from 'react'

import {TableCR} from './TableCR'
import ITablePerson from './interfaces/itableperson'
import { Person } from './entity/Person';

export class TablePerson extends React.Component<ITablePerson> {

  persons: Person[]

  constructor(props: ITablePerson) {
    super(props);
    this.persons = props.persons
  }

  render = () => {

    let PersonData = this.persons.map((value, index) => {
      return ['' + value.id, '' + value.name, '' + value.sex,
      '' + value.age, '' + value.pclass, '' + value.sibSp, '' + value.parch,
      '' + value.ticket, '' + value.fare, '' + value.cabin, '' + value.embarked, '' + value.survived]
    })

    return (
      <TableCR header={["Id", "Name", "Sex", "Age", "Ticket class", 
      "Siblings/spouses aboard", "Parents/children aboard", "Ticket number",
      "Fare", "Cabin number", "Port of Embarkation", "Survival"]}
       tableData={PersonData} />
    );

  }

};
