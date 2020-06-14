import React from 'react';
import {Form,Button,Label,Header} from 'semantic-ui-react'
//import {addContact,editContact} from '../actions/contactActions';
import {withRouter} from 'react-router-dom'
import {observer,inject} from 'mobx-react';
import {showAnswerDocument, showQuestionDocument} from '../../firebase/firebase.utils';
import { getDateAndTime } from '../../functions';

// Page = (props) => (
class AnswerForm extends React.Component {
	constructor(props) {
        super(props);

        console.log("qid: " + this.props.question_id);
        console.log("aid: " + this.props.answer_id);
        console.log("props: " + this.props);


        let curr_user = "";
        let authorname = "";
        if (this.props.state.currentUser !== null) {
            curr_user = this.props.state.currentUser.id;
            authorname = this.props.state.currentUser.displayName;
        }
		if(props.answermode === "Add") {
			this.state = {
                id: null,
                data: "",
				author_id: curr_user,
				author_name: authorname,
				created_at: "",
                body: "",
                questionid: this.props.question_id,
                marked_as_best: false,
                votes: 0,
                questionData: null
			} 
		} else {
			this.state = {
                id: this.props.answer_id,
                data: "",
				author_id: curr_user,
				author_name: authorname,
				created_at: "",
                body: "",
                questionid: this.props.question_id,
                marked_as_best: false,
                votes: 0,
                questionData: null
	        }
	    }
    }

    getAnswer = async (answerid) => {
        // Change this to .then() instead of await
        let data = await showAnswerDocument(answerid);
        // check await?
        let newDate = await getDateAndTime(data.created_at.seconds);
        await this.setState({ data: { ...data, created_at: newDate } });
        this.props.state.currentAnswer = data;
        console.log("getAnswer in AnswerForm: " + data);
        console.log("getAnswer in AnswerForm: " + data.body);
        await this.setState({body: data.body});
    };

    getQuestion = async () => {
        // Change this to .then() instead of await
        let data = await showQuestionDocument(this.props.question_id);
        // check await?
        let newDate = await getDateAndTime(data.created_at.seconds);
        await this.setState({ questionData: { ...data, created_at: newDate } });
    
        //await this.getAnswers();
    };
    
    componentDidMount() {
        console.log("this.props.answer_id: " + this.props.answer_id);
        this.getAnswer(this.props.answer_id);

        //this.getQuestion();
    }

    onChange = (event) => {
		let state = {}
		state[event.target.name] = event.target.value
        this.setState(state);
        if (event.target.name === "body") {
            this.props.state.currentAnswer.body = event.target.value;
        }
    }
    
    onSubmit = (event) => {
		event.preventDefault();
		return;
    }
	
    submit = (event) => {
		event.preventDefault();
	}
	
	render() {

		return(
		<div>
			<Form onSubmit={this.submit}>
				<Header as='h2'>Answer</Header>
				<Form.Field>
					
                    <textarea 
                        className="form-control" 
                        id="exampleFormControlTextarea1" 
                        rows="12"
                        onChange={this.onChange}
						name="body"
						value={this.state.body}>
                    </textarea>

					<input type="textarea"
							onChange={this.onChange}
							name="body2"
							/>				
				</Form.Field>
								
			</Form>
			<Button onClick={this.onSubmit}>{this.props.mode}</Button>
		</div>
		)
	}

}

export default inject(store => ({
	state:store.state
}))(observer(withRouter(AnswerForm)))

