const fs = require('fs').promises; // Using promises version of fs
const GiftParser = require('../parser/giftParser.js');
const QuestionBank = require('./QuestionBank.js');
const Question = require('./Question.js');
const Test = require('./Test.js')

async function processGiftFiles(filePaths) {
    const nationalQB = new QuestionBank([]);

    try {
        for (const filePath of filePaths) {
            const data = await fs.readFile(filePath, 'utf8');
            const analyzer = new GiftParser(false, false);
            analyzer.parse(data);

            if (analyzer.errorCount === 0) {
                console.log(`${filePath} is a valid .gift file`);
            } else {
                console.log(`${filePath} contains errors`);
            }

            nationalQB.addMore(analyzer.parsedQuestion);
            console.log('Parsed Questions:', analyzer.parsedQuestion); // Check parsed questions
        }

        console.log('National Question Bank:', nationalQB); // Check the QuestionBank content

        return nationalQB; // You can return the QuestionBank if needed
    } catch (err) {
        console.error('Error processing files:', err);
    }
}


// Example usage: Replace this array with your array of file paths
const fileArray = [
    //'../parser/SujetB_data/EM-U4-p32_33-Review.gift',
    //'../parser/SujetB_data/EM-U42-Ultimate.gift',
    './parser/SujetB_data/U4-p47-Review.gift',
    './parser/SujetB_data/EM-U5-p34-Gra-Expressions_of_quantity.gift'
    // 'SujetB_data/EM-U5-p34-Voc.gift',
    // 'SujetB_data/EM-U5-p35-Gra-Subject_verb_agreement.gift'
    // Add more file paths here as needed
];

async function runProcess() {
    var qb = new QuestionBank([]);
    qb = await processGiftFiles(fileArray);

    // Create a Test instance
    var testo = new Test();
    console.log(qb)
    // Add questions from the QuestionBank to the Test
    //testo.add(qb.questions[0]);
    //testo.add(qb.questions[1]);
    //testo.add(qb.questions[2]);
    testo.add(qb.questions[3]);
    // Add more questions as needed
    // Visualize the questions in the Test
    console.log("---------------------Visualize------------------")
    testo.visualize();
    testo.simulate();
}

// Call the function with your array of file paths
runProcess();
