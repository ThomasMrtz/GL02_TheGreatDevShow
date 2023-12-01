const fs = require('fs');
const GiftParser = require('./giftParser.js');
const Question = require('./Question.js');

fs.readFile('SujetB_data/U4-p47-Review.gift', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }

    let analyzer = new GiftParser(false, false);
    analyzer.parse(data);
    
    if(analyzer.errorCount === 0){
        console.log("The .gift file is a valid gift file");
    }else{
        console.log("The .gift file contains error");
    }
    console.log('Datas:');
    
    for (let i = 0; i < analyzer.parsedQuestion.length; i++){
        console.log('New Question:\n');
        analyzer.parsedQuestion[i].visualise();
    }

    /*
    console.log('QuestionBank: ');
    console.log(Question.questionBank);
    */
});
