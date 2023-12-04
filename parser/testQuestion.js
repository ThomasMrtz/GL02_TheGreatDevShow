const fs = require('fs');
const GiftParser = require('./giftParser.js');
const Question = require('./Question.js');
const Test = require('./Test.js');

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
    var prem = new Test();
    var sec = new Test();
    for (let i = 0; i < analyzer.parsedQuestion.length; i++){
        console.log('New Question:\n');
        analyzer.parsedQuestion[i].visualise();
        if(i%2 == 0){
            prem.add(analyzer.parsedQuestion[i])
            sec.add(analyzer.parsedQuestion[i])
        }
    }

    console.log("-----------------Test---------------------")
    console.log(prem.visualize())
    if(prem.equals(sec)){
        console.log("La même choseeeeeeeeeeeeee")
    }
    

    /*
    console.log('QuestionBank: ');
    console.log(Question.questionBank);
    */
    
});
