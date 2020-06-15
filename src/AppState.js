import {observable} from 'mobx'

const appState = observable({
    currentQuestionID: -1,
    questions: [],
    answers: [],
	currentUser: null,
    currentQuestion: null,
    questionmode:"Add",
    currentAnswer: null,
    answermode:"Add"
})

export default appState;