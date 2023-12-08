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

    // static questionBank = [];

    // Print the question object's attributes
    visualise () {
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
            console.log('Question text:');
            console.log(this.text);
            console.log('');

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

    // Visualise for students, depending on the type of the question
    visualiseForStudents() {

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
            console.log('Question text:');
            console.log(this.text);
            console.log('');

            switch (this.typeQuestion){

                case TypeQuestion.MATCHING:
                    let matchingLeftTab = [];
                    let matchingRightTab = [];

                    for (let i = 0; i < this.correct_answer[0].length; i++) {
                        let currentString = this.correct_answer[0][i];
                        let arrowIndex = currentString.indexOf('->');

                        if (arrowIndex !== -1) {
                            let matchingLeft = currentString.substring(0, arrowIndex).trim();
                            matchingLeftTab.push(matchingLeft);

                            let matchingRight = currentString.substring(arrowIndex + 2).trim();
                            matchingRightTab.push(matchingRight);
                        } else {
                            matchingLeftTab.push(currentString.trim());
                        }
                    }

                    matchingLeftTab = this.shuffleTab(matchingLeftTab);
                    matchingRightTab = this.shuffleTab(matchingRightTab);

                    for (let i = 0; i < matchingLeftTab.length; i++){
                        console.log(matchingLeftTab[i] + '                                 ' + matchingRightTab[i]);
                    }
                    console.log('');
                    break;
                
                case TypeQuestion.MISSING_WORD:
                    break;
                
                case TypeQuestion.MULTIPLE_CHOICE:
                    if (Array.isArray(this.correct_answer[0])){
                        for (let i = 0; i < this.correct_answer.length; i++){
                            let answers = [];
                            for (let j = 0; j < this.correct_answer[i].length; j++){
                                answers.push(this.correct_answer[i][j]);
                            }
                            for (let j = 0; j < this.incorrect_answer[i].length; j++){
                                answers.push(this.incorrect_answer[i][j]);
                            }
                            for (let j = 0; j < this.partially_correct_answer[i].length; j++){
                                answers.push(this.partially_correct_answer[i][j]);
                            }
                            answers = this.shuffleTab(answers);

                            console.log('Word ' + i);
                            for (let j = 0; j < answers.length; j++){
                                console.log(answers[j]);
                            }
                            console.log('');
                        }
                    } else {
                        let answers = [];
                        for (let i = 0; i < this.correct_answer.length; i++){
                            answers.push(this.correct_answer[i]);
                        }
                        for (let i = 0; i < this.incorrect_answer.length; i++){
                            answers.push(this.incorrect_answer[i]);
                        }
                        for (let i = 0; i < this.partially_correct_answer.length; i++){
                            answers.push(this.partially_correct_answer[i]);
                        }
                        answers = this.shuffleTab(answers);
                        console.log('Answers:')
                        for (let i = 0; i < answers.length; i++){
                            console.log(answers[i]);
                        }
                        console.log('');
                    }
                    break;
                
                case TypeQuestion.NUMERIC:
                    break;
                
                case TypeQuestion.OPEN_QUESTION:
                    break;

                case TypeQuestion.TRUE_FALSE:
                    console.log('True or False ?'),
                    console.log('');
                    break;
                
                default:
                    break;
            }
        }
    }

    // Used in visualiseForStudents
    shuffleTab(tab){
        for (let i = 0; i < 1000; i++){
            let idx1 = Math.floor(Math.random() * (tab.length));
            let idx2 = Math.floor(Math.random() * (tab.length));

            let temp = tab[idx1];
            tab[idx1] = tab[idx2];
            tab[idx2] = temp;

            return tab;
            
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
                            switch (this.typeQuestion){
                                case TypeQuestion.TRUE_FALSE:
                                    if (this.correct_answer[i][j] == 'T' || this.correct_answer[i][j] == 'TRUE'){
                                        if (Question.removeUselessChars(userAnswer[i]) == 'T' || Question.removeUselessChars(userAnswer[i]) == 'TRUE'){
                                            isCorrect = true;
                                        }
                                    }else{
                                        if (Question.removeUselessChars(userAnswer[i]) == 'F' || Question.removeUselessChars(userAnswer[i]) == 'FALSE'){
                                            isCorrect = true;
                                        }
                                    }
                                    break;
                                case TypeQuestion.NUMERIC:
                                    if (this.correct_answer[i][j].includes(':')){
                                        let answer = removeUselessChars(this.correct_answer[i][j]);
                                        if (answer[0] == '%'){
                                            answer = answer.substring(1);
                                            while (answer[0] != '%'){
                                                answer = answer.substring(1);
                                            }
                                            answer = answer.substring(1);
                                        }
                                        let correctNumber = '';
                                        let range = '';
                                        while (answer[0] != ":"){
                                            correctNumber = correctNumber + answer[0];
                                            answer = answer.substring(1);
                                        }
                                        answer = answer.substring(1);
                                        while (answer.length > 0){
                                            range = range + answer[0];
                                            answer = answer.substring(1);
                                        }
                                        correctNumber = parseFloat(correctNumber);
                                        range = parseFloat(range);
                                        let userAnswerInt = parseFloat(Question.removeUselessChars(userAnswer[i]));
                                        if (userAnswerInt >= correctNumber - range && userAnswerInt <= correctNumber + range){
                                            isCorrect = true;
                                        }
                                    } else {
                                        let answer = this.correct_answer[i][j];
                                        answer = answer.replace(/\s/g, '');
                                        answer = answer.replace(/\\n/g, '');
                                        answer = answer.replace(/\\r/g, '');
                                        answer = answer.replace(/\,/g, '');
                                        answer = answer.replace(/\;/g, '');
                                        answer = answer.replace(/\!/g, '');
                                        answer = answer.replace(/\?/g, '');
                                        answer = answer.toLowerCase();
                                        if (answer[0] == '%'){
                                            answer = answer.substring(1);
                                            while (answer[0] != '%'){
                                                answer = answer.substring(1);
                                            }
                                            answer = answer.substring(1);
                                        }
                                        let minimumNumber = '';
                                        let maximumNumber = '';
                                        let test = false;
                                        while (answer.length > 0){
                                            if (answer[0] == '.' && answer[1] == '.'){
                                                test = true;
                                                answer = answer.substring(1);
                                                answer = answer.substring(1);
                                            } else if (!test){
                                                minimumNumber = minimumNumber + answer[0];
                                                answer = answer.substring(1);
                                            } else if (test){
                                                maximumNumber = maximumNumber + answer[0];
                                                answer = answer.substring(1);
                                            }
                                        }
                                        if (maximumNumber == ''){
                                            if (minimumNumber == Question.removeUselessChars(userAnswer[i])){
                                                isCorrect = true;
                                            }
                                        } else {
                                            minimumNumber = parseFloat(minimumNumber);
                                            maximumNumber = parseFloat(maximumNumber);
                                            let userAnswerInt = Question.removeUselessChars(parseFloat(userAnswer[i]));
                                            if (userAnswerInt >= minimumNumber && userAnswerInt <= maximumNumber){
                                                isCorrect = true;
                                            }
                                        }
                                    }
                                default:
                                    if (Question.removeUselessChars(userAnswer[i]) == Question.removeUselessChars(this.correct_answer[i][j])){
                                        isCorrect = true;
                                    }
                                    if (Question.removeUselessChars(userAnswer[i]) == Question.removeUselessChars(this.partially_correct_answer[i][j])){
                                        isCorrect = true;
                                    }
                                    break;
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
                    switch (this.typeQuestion){
                        case TypeQuestion.TRUE_FALSE:
                            if (this.correct_answer[i] == 'T' || this.correct_answer[i] == 'TRUE'){
                                if (Question.removeUselessChars(userAnswer) == 'T' || Question.removeUselessChars(userAnswer) == 'TRUE'){
                                    return true;
                                }
                            }else{
                                if (Question.removeUselessChars(userAnswer) == 'F' || Question.removeUselessChars(userAnswer) == 'FALSE'){
                                    return true;
                                }
                            }
                            break;
                        case TypeQuestion.NUMERIC:
                            if (this.correct_answer[i].includes(':')){
                                let answer = removeUselessChars(this.correct_answer[i]);
                                if (answer[0] == '%'){
                                    answer = answer.substring(1);
                                    while (answer[0] != '%'){
                                        answer = answer.substring(1);
                                    }
                                    answer = answer.substring(1);
                                }
                                let correctNumber = '';
                                let range = '';
                                while (answer[0] != ":"){
                                    correctNumber = correctNumber + answer[0];
                                    answer = answer.substring(1);
                                }
                                answer = answer.substring(1);
                                while (answer.length > 0){
                                    range = range + answer[0];
                                    answer = answer.substring(1);
                                }
                                correctNumber = parseFloat(correctNumber);
                                range = parseFloat(range);
                                let userAnswerInt = parseFloat(Question.removeUselessChars(userAnswer));
                                if (userAnswerInt >= correctNumber - range && userAnswerInt <= correctNumber + range){
                                    return true;
                                }
                            } else {
                                let answer = this.correct_answer[i];
                                answer = answer.replace(/\s/g, '');
                                answer = answer.replace(/\\n/g, '');
                                answer = answer.replace(/\\r/g, '');
                                answer = answer.replace(/\,/g, '');
                                answer = answer.replace(/\;/g, '');
                                answer = answer.replace(/\!/g, '');
                                answer = answer.replace(/\?/g, '');
                                answer = answer.toLowerCase();
                                if (answer[0] == '%'){
                                    answer = answer.substring(1);
                                    while (answer[0] != '%'){
                                        answer = answer.substring(1);
                                    }
                                    answer = answer.substring(1);
                                }
                                let minimumNumber = '';
                                let maximumNumber = '';
                                let test = false;
                                while (answer.length > 0){
                                    if (answer[0] == '.' && answer[1] == '.'){
                                        test = true;
                                        answer = answer.substring(1);
                                        answer = answer.substring(1);
                                    } else if (!test){
                                        minimumNumber = minimumNumber + answer[0];
                                        answer = answer.substring(1);
                                    } else if (test){
                                        maximumNumber = maximumNumber + answer[0];
                                        answer = answer.substring(1);
                                    }
                                }
                                if (maximumNumber == ''){
                                    if (minimumNumber == Question.removeUselessChars(userAnswer)){
                                        return true;
                                    }
                                } else {
                                    minimumNumber = parseFloat(minimumNumber);
                                    maximumNumber = parseFloat(maximumNumber);
                                    let userAnswerInt = Question.removeUselessChars(parseFloat(userAnswer));
                                    if (userAnswerInt >= minimumNumber && userAnswerInt <= maximumNumber){
                                        return true;
                                    }
                                }
                            }
                        default:
                            if (Question.removeUselessChars(userAnswer) == Question.removeUselessChars(this.correct_answer[i])){
                                return true;
                            }
                            if (Question.removeUselessChars(userAnswer) == Question.removeUselessChars(this.partially_correct_answer[i])){
                                return true;
                            }
                            break;
                    }
                }
                return false;
            } 
        }

        return false;
    }

    // This function is used in check(userAnswer)
    static removeUselessChars(answer) {
        answer = answer.replace(/\s/g, '');
        answer = answer.replace(/\\n/g, '');
        answer = answer.replace(/\\r/g, '');
        answer = answer.replace(/\./g, '');
        answer = answer.replace(/\,/g, '');
        answer = answer.replace(/\;/g, '');
        answer = answer.replace(/\!/g, '');
        answer = answer.replace(/\?/g, '');
        answer = answer.toLowerCase();
        return answer;
    }

    // Returns true if it's the same question, false otherwise 
    equals(question2) {
        if (this.title = question2.title){
            return true;
        }else{
            return false;
        }
    }

    getTypeQuestion(){
        return this.typeQuestion;
    }

    /*
    static findQuestionInQuestionBank(title){
        title = Question.removeUselessChars(title);
        for (let i = 0; i < Question.questionBank.length; i++){
            if (title = Question.removeUselessChars(Question.questionBank[i].title)){
                return Question.questionBank[i];
            }
        }
        return null;
    }
    */

}

module.exports = Question;
