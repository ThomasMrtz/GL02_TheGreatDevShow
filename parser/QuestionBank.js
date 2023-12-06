const Question = require('./Question.js');

class QuestionBank{

    constructor(questions){
        this.questions = questions;
    }

    add(question){
        this.questions.push(question);
    }

    remove(question){
        questions.remove(question);
    }

    addMore(questions){
        /*
        for(let i=0;i<questions.length;i++){
            this.add(questions[i]);
        }
        */
        this.questions.push.apply(this.questions,questions);

    }

    // Find a question with the title
    findQuestion(idx){

        for(let i = 0; i < this.questions.length; i++) {
            if (i == idx) { return this.question[i] }
        }

        return null;
    }


}

module.exports = QuestionBank;