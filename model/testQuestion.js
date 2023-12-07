const fs = require('fs').promises; // Using promises version of fs
const GiftParser = require('../parser/giftParser.js');
const QuestionBank = require('./QuestionBank.js');
const Question = require('./Question.js');

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

        // This will log the questions after processing
        for(let i=0; i < nationalQB.questions.length; i++) {
            console.log("Question " + i + ":");
            nationalQB.questions[i].visualise();
            console.log("\n");
        }
    
        return nationalQB; // You can return the QuestionBank if needed
    } catch (err) {
        console.error('Error processing files:', err);
    }
}

// Example usage: Replace this array with your array of file paths
const fileArray = [
    './parser/SujetB_data/U4-p47-Review.gift'
    // 'SujetB_data/EM-U5-p34-Gra-Expressions_of_quantity.gift',
    // 'SujetB_data/EM-U5-p34-Voc.gift',
    // 'SujetB_data/EM-U5-p35-Gra-Subject_verb_agreement.gift'
    // Add more file paths here as needed
];

// Call the function with your array of file paths
processGiftFiles(fileArray);
