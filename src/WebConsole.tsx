import React from 'react'
import './App.css';

export class WebConsole extends React.Component<WebConsoleProps, WebConsoleState> {

    constructor(props: any) {
        super(props);    
    }

    render = () => {
        return <div>
            <button onClick={() => this.props.doAction()}>Train the model</button>
            <textarea className="webConsole" rows={this.props.rowsSize} key={this.props.outputText} readOnly>
                {this.props.outputText}
            </textarea>
        </div>
    }

}

interface WebConsoleProps {
    outputText: string
    rowsSize?: number
    doAction: Function
};

interface WebConsoleState {
}