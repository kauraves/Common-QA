import React, { Component } from "react";
//import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {observer,inject} from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import { getDateAndTime } from '../../functions';


class AnswerList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hasAnswers: false,
            answers: [],
        };

        
    }

    hasAnswers() {
        try {
            let count = this.props.answers.count();
            if (count > 0) {
                this.setState({hasAnswers: true});
            }
        } catch (error) {
            this.setState({hasAnswers: false});
        }
    }
    
    upvoteQuestion(questionID) {
        console.log("This upvotes questionID: " + questionID)
    }

    downvoteQuestion(questionID) {
        console.log("This downvotes questionID: " + questionID)
    }

    editAnswer (answer) {
        console.log("edit answer = " + answer.answer_id);
    }

    deleteAnswer (answer) {

    }

    markedAsBestAnswer(answer)
    {
        let text = String.fromCodePoint(0x1F354);
        text = "✔️";
        if (answer.marked_as_best === true){
            return <span> {text}</span>
        } else {
            return <span></span>
        }
    }

    getEditPart(id){
        let question_id = this.props.question_id;
        let text = <Link key={id} to={`/question/${question_id}/answer/${id}`} 
                         question_id={question_id} 
                         answer_id={id}>
                        Edit
                    </Link>
        text = <Link key={id} to={`/answer/${id}`}  
                         answer_id={id}>
                        Edit
                    </Link>
        return text;
    }



    getDeletePart(id){
        let text = <Link key={777+id} to={`/answer/delete/${id}`} content={id}>Delete</Link>

        /*let text2 = <Link key={777+id} to={`/answer/delete/${id}`} content={id}>Delete
            <Button className="btn btn-sm btn-danger m-1">
                        <span>Delete</span>
            </Button>
        
        </Link>
        */
        return text;
    }

    editAnswer = (id, ...args) => {
        //this.props.(...args);
        this.props.history.push("/question/question_id"+id);
    }
    
    deleteAnswer = (id, ...args) => {
        //this.props.(...args);
        //this.props.history.push("/shop/"+id);
        console.log("We delete the question "+ id);
    }

    render() {
        
        let answerItems = this.props.answers.map((answer, index) =>
              <tr key={index}>
                <td>
                    <button><i className="fas fa-thumbs-up"></i></button> 
                    <span>{answer.votes}</span> 
                    <p>{this.markedAsBestAnswer(answer)}</p> 
                    <button><i className="fas fa-thumbs-down"></i></button>
                </td>
                <td>
                    <p className="textBlock" >{answer.body + " "} {}</p>
                    <p className="textBlock">Answered by: {answer.author_name} at {getDateAndTime(answer.created_at.seconds)  } </p>
                    
                    <p>{this.getEditPart(answer.answer_id)}      {this.getDeletePart(answer.answer_id)}</p>
                    
                </td>
                
              </tr>
            )

        if (this.props.answers == null || this.props.answers.length === 0) {
            return <h5 className="p-2">No Answers yet</h5>
        }
        else {
            return (
                <div className='homepage'>
                  <Table striped bordered hover>
                    <thead>  
                      <tr>
                        <th></th>
                        <th> <h4>Answers </h4> </th>
                      </tr>
                    </thead>
                    <tbody>
                    {answerItems}
                    </tbody>
                  </Table>  
                </div>
              );   
        }
        
    }
}

//export default withRouter(AnswerList); 

export default inject(store => ({
	state:store.state
}))(observer(withRouter(AnswerList)))


/*

<button onClick={this.editAnswer(answer.answer_id)}>
                        Edit
                    </button>

let answerItems = this.props.answers.map(answerItem =>
    <div key={answerItem.answerid}>
      <tr>
        <td>
          <Votes votes={answerItem.answervotesup} answerID={answerItem.answerid}
          upvoteQuestion={this.upvoteQuestion} downvoteQuestion={this.downvoteQuestion}/>
        </td>
        <td>
          <p className="textBlock">
            {this.props.textBlock}
          </p>
        </td>
      </tr>
      );
    </div>

*/
/*
<td>
                    <button className="btn btn-sm btn-warning m-1"
                        onClick={ () => this.editAnswer(answerItem) }>
                            Edit
                    </button>
                    
                    <button className="btn btn-sm btn-danger m-1"
                        onClick={ () => this.deleteAnswer(answerItem) }>
                        Delete
                    </button>
                </td>
*/