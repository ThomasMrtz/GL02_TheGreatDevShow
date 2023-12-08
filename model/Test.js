const Question = require("./Question.js");
const giftParser = require("../parser/giftParser.js");
const Profile = require("./Profile.js");

class Test {
    static testBank = [];

    constructor() {
        this.questions = [];
    }

    // visualize test
    visualize() {
        for (let i = 0; i < this.questions.length; i++) {
            this.questions[i].visualise();
        }
    }

    add(question) {
        this.questions.push(question);
    }

    remove(question) {
        const index = this.questions.indexOf(question);
        if (index < 0) {
        console.error("Question could not be found in the test");
        return false;
        }
        // 2nd parameter means remove one item only
        array.splice(index, 1);
        return true;
    }

    // remove question by index (index from test question array)
    removeByIndex(index) {
        if (index < 0) {
        console.error("Question could not be found in the test");
        return false;
        }
        // 2nd parameter means remove one item only
        array.splice(index, 1);
        return true;
    }

    // checks if two tests are the same (have the same questions)
    equals(otherTest) {
        let thisLength = this.questions.length;

        if(thisLength != otherTest.questions.length) {
            return false;
        }

        for (let i = 0; i < thisLength; i++) {
        if (!this.questions[i].equals(otherTest.questions[i])) {
            return false;
        }
        }

        return true;
    }

    // checks if the test contains duplicate questions
    haveUniqueQuestions() {
        return new Set(this.questions).size === this.questions.length;
    }

    // checks if there are at least 15 unique questions and maximum 20
    finishTest() {
        let questionNo = this.questions.length;

        if(questionNo < 14) {
            console.error("Not enought questions! The test should contain minimum 15 questions. Please add more.");
            return false;
        }
        if(questionNo > 20) {
            console.error("Too many questions! The test should contain at most 20 questions. Please remove " + (questionNo - 20) + " questions.");
            return false;
        }

        if(!this.haveUniqueQuestions()) {
            return false;
        }

        // test can be saved in the test bank
        testBank.push(this);
        return true;
    }

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

        return new Profile(mc, tf, m, mw, num, oq);
    }

    simulate() {}
}

module.exports = Test;
