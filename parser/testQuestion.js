const fs = require('fs').promises; // Using promises version of fs
const GiftParser = require('./giftParser.js');
const QuestionBank = require('./QuestionBank.js');
const Question = require('./Question.js');
const Test = require('./test.js');

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
        }

        //console.log(nationalQB.questions); // This will log the questions after processing
        for(let i=0;i<nationalQB.questions.length;i++){
            console.log(nationalQB.questions[i].visualise());
        }

        return nationalQB; // You can return the QuestionBank if needed
    } catch (err) {
        console.error('Error processing files:', err);
    }
}

// Example usage: Replace this array with your array of file paths
const fileArray = [
    'SujetB_data/U4-p47-Review.gift'
    //'SujetB_data/EM-U5-p34-Gra-Expressions_of_quantity.gift',
    //'SujetB_data/EM-U42-Ultimate.gift',
    //'SujetB_data/U6-p61-5-Future-forms.gift',
    //'SujetB_data/U9-p95-Third_cond-4.gift'
    // Add more file paths here as needed
];

// Call the function with your array of file paths inside an async function
async function runProcess() {
    var qb = new QuestionBank([]);
    qb = await processGiftFiles(fileArray);

    // Create a Test instance
    var testo = new Test([]);
    console.log("------------------------------")
    console.log(qb.questions[1])
    console.log("--------------ttttttttttttttttt----------------")
    // Add questions from the QuestionBank to the Test
     // Adjust this part as needed
    testo.add(qb.questions[1]); // Adjust this part as needed
    // Add more questions as needed

    // Visualize the questions in the Test
    testo.visualize();
    testo.simulate();
}

// Call the async function to run the code
runProcess();


