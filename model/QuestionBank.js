const Question = require('./Question');
const Profile = require('./Profile');
const TypeQuestion = require('./TypeQuestion')

class QuestionBank {

    constructor(questions) {
        this.questions = questions;
    }

    add(question) {
        this.questions.push(question);
    }

    remove(question){
        const index = this.questions.indexOf(question);
        // only splice array when item is found
        if (index > -1) {     
            // 2nd parameter means remove one item only      
            array.splice(index, 1); 
        }
    }

    addMore(questions) {
        this.questions.push.apply(this.questions,questions);
    }

    // find a question by index
    findQuestion(index) {
        for(let i = 0; i < this.questions.length; i++) {
            if (i == index) { return this.question[i] }
        }

        return null;
    }

    // create a profile
    createProfile() {
        let mc = 0;
        let tf = 0;
        let m = 0;
        let mw = 0;
        let num = 0;
        let oq = 0;
        this.questions.forEach(question => {
            switch (question.typeQuestion) {
                case TypeQuestion.MULTIPLE_CHOICE:
                    mc++;
                    break;
                case TypeQuestion.TRUE_FALSE:
                    tf++;
                    break;
                case TypeQuestion.MATCHING:
                    m++;
                    break;
                case TypeQuestion.MISSING_WORD:
                    mw++;
                    break;
                case TypeQuestion.NUMERIC:
                    num++;
                    break;
                case TypeQuestion.OPEN_QUESTION:
                    oq++;
                    break;
            }
        });

        return new Profile('Question Bank', mc, tf, m, mw, num, oq);
    }
}

module.exports = QuestionBank;