const TypeQuestion = require('./TypeQuestion');

class Question {
    constructor(com, ttl, txt, frt, tq, ca, ia, pca, cf, ife, pcf, gf){
        this.comment = com;
        this.title = ttl;
        this.text = txt;
        this.text_formating = frt;
        this.typeQuestion = tq
        this.correct_answer = [].concat(ca);
        this.incorrect_answer = [].concat(ia);
        this.partially_correct_answer = [].concat(pca);
        this.correct_feedback = [].concat(cf);
        this.incorrect_feedback = [].concat(ife);
        this.partially_correct_feedback = [].concat(pcf);
        this.gift_format = gf;
    }

    static questionBank = [];

    // Print the question object's attributes
    visualise(){
        if (this.comment != null){
            console.log('Comment: ');
            console.log(this.comment);
            console.log('');
        }else{
            console.log('Title:');
            console.log(this.title);
            console.log('');
            if (this.text_formating != null){
                console.log('Text-formating:');
                console.log(this.text_formating); 
                console.log('');
            }
            if (this.typeQuestion != null){
                console.log('Question type:');
                console.log(this.typeQuestion);
                console.log('');
            }

            // Correct Answers
            if (this.correct_answer != []){
                if (Array.isArray(this.correct_answer[0])){
                    let test = false;   // Just to know if 'Correct answers:' has already been printed
                    for (let i = 0; i < this.correct_answer.length; i++){
                        if (this.correct_answer[i] != []){
                            for (let j = 0; j < this.correct_answer[i].length; j++){
                                if (!test){
                                    console.log('Correct Answers:');
                                    test = true;
                                }
                                console.log(this.correct_answer[i][j]);
                            }
                        }
                    }
                }else{
                    console.log('Correct Answers:');
                    for (let i = 0; i < this.correct_answer.length; i++){
                        console.log(this.correct_answer[i]);
                    }
                    console.log('');
                }
            }

            // Correct feedbacks
            if (this.correct_feedback != []){
                if (Array.isArray(this.correct_feedback[0])){
                    let test = false;
                    for (let i = 0; i < this.correct_feedback.length; i++){
                        if (this.correct_feedback[i] != []){
                            for (let j = 0; j < this.correct_feedback[i].length; j++){
                                if (!test){
                                    console.log('Correct Feedbacks:');
                                    test = true;
                                }
                                console.log(this.correct_feedback[i][j]);
                            }
                        }
                    }
                }else{
                    console.log('Correct Feedbacks:');
                    for (let i = 0; i < this.correct_feedback.length; i++){
                        console.log(this.correct_feedback[i]);
                    }
                    console.log('');
                }
            }

            // Incorrect Answers
            if (this.incorrect_answer != []){
                if (Array.isArray(this.incorrect_answer[0])){
                    let test = false;
                    for (let i = 0; i < this.incorrect_answer.length; i++){
                        if (this.incorrect_answer[i] != []){
                            for (let j = 0; j < this.incorrect_answer[i].length; j++){
                                if (!test){
                                    console.log('Incorrect Answers:');
                                    test = true;
                                }
                                console.log(this.incorrect_answer[i][j]);
                            }
                        }
                    }
                }else{
                    console.log('Incorrect Answers:');
                    for (let i = 0; i < this.incorrect_answer.length; i++){
                        console.log(this.incorrect_answer[i]);
                    }
                    console.log('');
                }
            }

            // Incorrect Feedbacks
            if (this.incorrect_feedback != []){
                if (Array.isArray(this.incorrect_feedback[0])){
                    let test = false;
                    for (let i = 0; i < this.incorrect_feedback.length; i++){
                        if (this.incorrect_feedback[i] != []){
                            for (let j = 0; j < this.incorrect_feedback[i].length; j++){
                                if (!test){
                                    console.log('Incorrect Feedbacks:');
                                    test = true;
                                }
                                console.log(this.incorrect_feedback[i][j]);
                            }
                        }
                    }
                }else{
                    console.log('Incorrect Feedbacks:');
                    for (let i = 0; i < this.incorrect_feedback.length; i++){
                        console.log(this.incorrect_feedback[i]);
                    }
                    console.log('');
                }
            }

            // Partially Correct Answers
            if (this.partially_correct_answer != []){
                if (Array.isArray(this.partially_correct_answer[0])){
                    let test = false;
                    for (let i = 0; i < this.partially_correct_answer.length; i++){
                        if (this.partially_correct_answer[i] != []){
                            for (let j = 0; j < this.partially_correct_answer[i].length; j++){
                                if (!test){
                                    console.log('Partially Correct Answers:');
                                    test = true;
                                }
                                console.log(this.partially_correct_answer[i][j]);
                            }
                        }
                    }
                }else{
                    console.log('Partially Correct Answers:');
                    for (let i = 0; i < this.partially_correct_answer.length; i++){
                        console.log(this.partially_correct_answer[i]);
                    }
                    console.log('');
                }
            }

            // Partially Correct Feedbacks
            if (this.partially_correct_feedback != []){
                if (Array.isArray(this.partially_correct_feedback[0])){
                    let test = false;
                    for (let i = 0; i < this.partially_correct_feedback.length; i++){
                        if (this.partially_correct_feedback[i] != []){
                            for (let j = 0; j < this.partially_correct_feedback[i].length; j++){
                                if (!test){
                                    console.log('Partially Correct Feedbacks:');
                                    test = true;
                                }
                                console.log(this.partially_correct_feedback[i][j]);
                            }
                        }
                    }
                }else{
                    console.log('Partially Correct Feedbacks:');
                    for (let i = 0; i < this.partially_correct_feedback.length; i++){
                        console.log(this.partially_correct_feedback[i]);
                    }
                    console.log('');
                }
            }
            
        }
    }

    // Check if the userAnswer is a correct answer
    check(userAnswer){
        if (this.correct_answer != []){

            if (Array.isArray(this.correct_answer[0])){
                for (let i = 0; i < userAnswer.length; i++){
                    let isCorrect = false;
                    if (this.correct_answer[i] != []){
                        for (let j = 0; j < this.correct_answer[i].length; j++){
                            if (this.removeSpaces(answer[i]) == this.removeSpaces(this.correct_answer[i][j])){
                                isCorrect = true;
                            }
                        }
                    }
                    if (!isCorrect){
                        return false;
                    }
                }
                return true;
            }else{
                for (let i = 0; i < this.correct_answer.length; i++){
                    if (this.removeSpaces(userAnswer) == this.removeSpaces(this.correct_answer[i])){
                        return true;
                    }
                }
                return false;
            } 
        }

        return false;
    }

    // This function is used in check(userAnswer)
    removeSpaces(answer) {
        answer = answer.replace(/\s/g, '');
        answer = answer.replace(/\\n/g, '');
        answer = answer.replace(/\\r/g, '');
        return answer;
    }

    // Returns true if it's the same question, false otherwise 
    equals(question2){
        if (this.title == question2.title){
            return true;
        }else{
            return false;
        }
    }


}

module.exports = Question;