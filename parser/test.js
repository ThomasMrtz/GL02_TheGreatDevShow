const Question = require('./Question.js');
const giftParser = require('./giftParser.js');
const prompt = require('prompt-sync')();

class Test {
    constructor(questions){
        this.questions = questions;
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
        this.questions.remove(question);
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
        var cpt = 0;
        var responses = [[]];

        for(let i=0; i<this.questions.length;i++){
            this.questions[i].visualiseForStudents();
        }

        while(cpt < this.questions.length){
            
            var a = prompt("Which question you want to respond to ? (Type a number) : ");
            console.log("Question n°", a);
        
            var qtype = this.questions[a].getTypeQuestion();
            console.log(qtype)
            let resp;

            switch(qtype){
            case "Multiple Choice":
                resp = prompt("Type the word : ");
                responses[a][0] = resp;
                break;
            case "True-False":
                resp = prompt("Type true or false : ");
                responses[a][0] = resp;
                break;
            case "Matching":
                for(let i=0;i<this.questions[a].correct_answer.length;i++){
                    resp = prompt("Type the phrase and his match with '->' between")
                    responses[a][i] = resp;  
                }
                break;
            case "Missing-Word":
                //responses[a] = resp;
                for(let i=0;i<this.questions[a].correct_answer.length;i++){
                    resp = prompt("Type the missing word : ")
                    responses[a][i] = resp;  
                }
                break;
            case "Numeric":
                resp = prompt("Type the number : ")
                responses[a][0] = resp;
                break;
            case "Open-Question":
                esp = prompt("Type a relevant sentence : ")
                responses[a][0] = resp;
                break;
            default:
             console.log("rien");
                break;
        }
        
        cpt++;
        

        }
        
        for(let i=0;i<responses.length;i++){
            console.log(responses)
            console.log(this.questions[i].check(responses[i]))
        }

        /*
        if question1.check(answer1) == false {
            console.log(The answer for the question + idx + is ...);
            noErr++;
        }
        
        if (noErr) == 0 then console.log("All the answers were correct!");
        */
    }
}

module.exports = Test;