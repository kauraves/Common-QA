import React from 'react';

class QuestionSummary extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h4 className="questionTitle" id={this.props.questionID}
                    onClick={() => this.props.goToQuestion(this.props.questionID)}> 
                    {this.props.question}
                </h4>
                <p className="textBlock">{this.props.textBlock}</p>
            </div>
        );
    }

}

export default QuestionSummary;