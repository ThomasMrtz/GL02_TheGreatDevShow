const Question = require("./Question.js");
const TypeQuestion = require("./TypeQuestion.js")
const giftParser = require("../parser/giftParser.js");
const Profile = require("./Profile.js");
const prompt = require('prompt-sync')();

class Test {
    static testBank = [];

    constructor(name, author) {
        this.name = name;
        this.author = author;
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

    addMore(questions) {
        this.questions.push.apply(this.questions, questions);
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

        return new Profile(this.name, mc, tf, m, mw, num, oq);
    }

    simulate() {
        var cpt = 0;
        var responses = [[]];    

        for(let a=0; a<this.questions.length;a++){
            this.questions[a].visualiseForStudents();
        }

        for (let b = 0; b < this.questions.length; b++) {
            if(this.questions[b].typeQuestion == null){
                this.questions.splice(b, 1);
            }
        }
        
        for (let c = 0; c < this.questions.length-1; c++) {
            responses.push([]);
        }

        var alreadyAws = [];
        console.log(this.questions.length, " questions ")
        while(cpt < this.questions.length){
            
            do{
            console.log("You can't respond twice to the same question !")
            var nb = prompt("Which question you want to respond to ? (Type a number) : ");
            }
            while(alreadyAws.includes(nb));
            console.log(typeof(nb))
            alreadyAws.push(nb)
            console.log("Question n°", nb);
            
            var qtype = this.questions[nb].getTypeQuestion();
            console.log(qtype)
            
            let resp;

            switch(qtype){
            case "Multiple Choice":
                resp = prompt("Type your answer : ");
                responses[nb][0] = resp;
                break;
            case "True-False":
                resp = prompt("Type true or false (t or f) : ");
                responses[nb][0] = resp;
                break;
            case "Matching":
                for(let d=0;d<this.questions[nb].correct_answer[0].length;d++){
                    console.log("Type the phrase and his match with '->' between :")
                    resp = prompt("rep : ")
                    responses[nb][d] = resp;  
                }
                break;
            case "Missing-Word":
                for(let e=0;e<this.questions[nb].correct_answer.length;e++){
                    resp = prompt("Type the missing word : ")
                    responses[nb][e] = resp;  
                }
                break;
            case "Numeric":
                resp = prompt("Type the number : ")
                responses[nb][0] = resp;
                break;
            case "Open-Question":
                resp = prompt("Type a relevant sentence : ")
                responses[nb][0] = resp;
                break;
            default:
             console.log("rien");
                break;
        }
        
        cpt++;
        

        }
        
        for(let n=0;n<responses.length;n++){
            console.log(responses)
            console.log(this.questions[n].check(responses[n]))

        }

    }
}

module.exports = Test;
