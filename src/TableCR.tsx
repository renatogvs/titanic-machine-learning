import React from 'react'
import ITableCR from './interfaces/itableCR'

export class TableCR extends React.Component<ITableCR> {
    header: string[]
    tableData: string[][]

    constructor(props: ITableCR) {
        super(props)
        this.header = props.header
        this.tableData = props.tableData
    }


    render = () => {

        return (

                    <table className="tableCR">
                        <thead>
                            <tr>
                                {this.header.map((value, index) => {
                                    return (<th className="headerTableCR">{value}</th>)
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {this.tableData.map((value, index) => {
                                return (<tr key={index}>
                                    {value.map((valueElement, indexElement) => {
                                        return (<td>{valueElement}</td>)
                                    })}
                                </tr>)
                            })}
                        </tbody>

                    </table>


        );

    }

}