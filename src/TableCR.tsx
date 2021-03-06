import React from 'react'

export class TableCR extends React.Component<ITableCRProps> {

    render = () => {

        return (

                    <table className="tableCR">
                        <thead>
                            <tr>
                                {this.props.header.map((value, index) => {
                                    return (<th key={index} className="headerTableCR">{value}</th>)
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.tableData.map((value, index) => {
                                return (<tr key={index}>
                                    {value.map((valueElement, indexElement) => {
                                        return (<td key={index * 100 + indexElement}>{valueElement}</td>)
                                    })}
                                </tr>)
                            })}
                        </tbody>

                    </table>


        );

    }

}

interface ITableCRProps {
    header: any[]
    tableData: any[][]
}