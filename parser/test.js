const Question = require('./Question.js');
const giftParser = require('./giftParser.js')
class Test {
    constructor(){
        this.questions = [];
    }

    static TestBank = [];

    visualize(){
        for(let i=0;i<this.questions.length;i++){
            console.log(this.questions[i])
        }
    }

    add(qst){
        this.questions.push(qst);
    }

    remove(){

    }

    equals(autreTest){
        var boolean = false;
        for(let i=0;i<this.questions.length;i++){
            if(this.questions[i].equals(autreTest.questions[i])){
                boolean = true
            }
            else{
                return false
                //break
            }
            
        }

        return boolean
    }

    simulate(){

    }
}

module.exports = Test;