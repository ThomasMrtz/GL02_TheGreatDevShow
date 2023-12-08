const Teacher = require('./model/Teacher');
const GiftParser = require('./parser/giftParser');
const { program } = require('@caporal/core');
const QuestionBank = require('./model/QuestionBank');
const TypeQuestion = require('./model/TypeQuestion');
const prompt = require('prompt-sync')();
const fs = require('fs').promises; // Use promises version of fs
const Profile = require('./model/Profile');
const path = require('path');
const Test = require('./model/Test')

const DATA_DIRECTORY = './parser/SujetB_data/';

program
  .command('createTest', 'Create an empty test and stores teacher\'s information')
  .action(async () => {
    const teacher = await getTeacherInfo();
    const testname = prompt('test name:').replace(/\s/g, '_');
    try {
      await fs.mkdir('./TestBank', { recursive: true });
    }
    catch(error){
      console.error('Error :', error.message);
    }
    teacher.generateVCard();
    console.log('vCard created successfully.');

    try {
      await saveToFile('', `./Test/${teacher.fullName}/${testname}.gift`);
      console.log(`Test created successfully.`);
    } catch (error) {
      console.error('Error creating test:', error.message);
    }
  })

  .command('addQuestion', 'Add a question to a test')
  .action(async () => {
    const teachername = prompt('teacher\'s name : ').replace(/\s/g, '_');
    const testname = prompt('test name : ').replace(/\s/g, '_');

    try {
      const question = await getQuestionsFromTeacher();
      const giftFormat = question.gift_format;
      const data= await parseData(`./Test/${teachername}/${testname}.gift`);
      if (data.length>=20){
        console.log("file contains 20 questions already. You can't add question anymore")
      }
      else{
       await fs.appendFile(`./Test/${teachername}/${testname}.gift`, giftFormat);
       console.log(`Question added successfully.`); 
      }
      
    } catch (error) {
      console.error('Error adding question:', error.message);
    }
  })

  .command('read', 'Reads the question bank')
  .action(async () => {
    try {
      const data= await parseData(`./questionBank/questionBank.gift`);
      for(let i=0;i<data.length;i++){
        console.log("question "+i+" : ");
        data[i].visualise();
        console.log('\n \n');
      }
    } catch (error) {
      console.error('Error :', error.message);
    }
  })

  .command('finish', 'Verify if a test has between 15 and 20 unique questions')
  .action(async () => {
    const teachername = prompt('teacher\'s name : ').replace(/\s/g, '_');
    const testname = prompt('test name :').replace(/\s/g, '_');
    try {
      const data = await parseData(`./Test/${teachername}/${testname}.gift`);
      let isEveryQuestionUnique=true;
      for(let i=0;i<data.length;i++){
        for (let j=i+1;j<data.length;j++){
          if (data[i].title==data[j].title){
            isEveryQuestionUnique=false;
            data.splice(j, 1); 
            j--;
          }
        }
      }
      if(!isEveryQuestionUnique){
        fs.unlink(`./Test/${teachername}/${testname}.gift`);
        for(let i=0;i<data.length;i++){
          fs.appendFile(`./Test/${teachername}/${testname}.gift`, data[i].gift_format);
        }
        console.log("multiple identic questions. file corrected. please retry");
      }
      else if (data.length>=15&&data.length<=20&&isEveryQuestionUnique){
        await fs.rename(`./Test/${teachername}/${testname}.gift`, `./TestBank/${teachername}/${testname}.gift`)
      }
      else{console.log(`this test has ${data.length} questions, a test has to have between 15 and 20 questions`);} 
     
    } catch (error) {
      console.error('Error :', error.message);
      return null;
    }
  })

  .command('loadQB', 'Load questions from a GIFT file into the question bank')
  .argument('<file>', 'The file containing questions to add to the question bank')
  .action(async ({ args, logger }) => {
    try {
      await fs.mkdir('./questionBank', { recursive: true });
      const data = await fs.readFile(args.file, 'utf8');
      await fs.appendFile('./questionBank/questionBank.gift', data);
      console.log('File appended successfully.');
    } catch (error) {
      console.error('Error loading questions:', error.message);
    }
  })

  .command('displayFileNames', 'Display the list of all GIFT files')
  .action(displayFileNames(DATA_DIRECTORY))


  .command('visualizeProfile', 'Generate a profile histogram based on a GIFT file')
  .argument('[files...]', 'The files containing the questions to analyze')
  .action(async ({ args, logger }) => {
    const qb = new QuestionBank([]);
    
    try {
      // Use Promise.all to wait for all file processing tasks to complete
      await Promise.all(args.files.map(async file => {
        const fileQuestions = await processGiftFile(file);
        if (fileQuestions != null) {
          qb.addMore(fileQuestions);
        } else {
          console.error("Error while processing GIFT file " + file);
        }
      }));

      const qbProfile = qb.createProfile();
      console.log(qbProfile);
      
      await qbProfile.visualize();
    } catch (err) {
      console.error('Error during visualizing:', err);
    }
  })

  .command('compare', 'Compare profile of a test made by a professor with the profile of another test or question bank')
  .action(async () => {
    const teacherName = prompt('Enter teacher name: ');
    // check if TestBank directory exists
    try {
      await fs.readdir('./TestBank/');
    } catch (err) {
      console.log("TestBank directory doesn't exist yet! Tests must be finished in order to be saved to this directory.")
    }
    
    // check if teacher name directory exists in TestBank directory and display its files if valid
    try {
      await displayFileNames('./TestBank/' + teacherName + '/');
    } catch (err) {
      console.log("The teacher " + teacherName + " didn't finish any tests yet or the name is invalid!");
    }
    const testFileName = prompt('Enter a test file name (with the extention .gift):');

    const testQuestions = await parseData('./TestBank/' + teacherName + '/' + testFileName);
    const test = new Test();
    test.addMore(testQuestions);

    test.visualize();
  })

async function getTeacherInfo() {
  console.log('Enter teacher information:');
  const name = prompt('Name: ');
  const course = prompt('Teaching course: ');
  const phoneNumber = prompt('Phone number: ');
  const email = prompt('Email address: ');
  const address = prompt('Address: ');
  return new Teacher(name, course, phoneNumber, email, address);
}

async function getQuestionsFromTeacher() {
  try {
    const data = await parseData('./questionBank/questionBank.gift');
    console.log('Enter question index for the test:');
    const qindex = parseInt(prompt(`Question index: `));

    const question = data[qindex]; //.find((q) => q.title === qname);
    if (question) {
      console.log("Question found:");
      console.log(question);
      return question;
    } else {
      console.log('Question not found');
      return null;
    }
    } catch (error) {
    console.error('Error getting questions:', error.message);
    return null;
  }
}

async function saveToFile(data, filename) {
  await fs.writeFile(filename, data);
}

async function parseData(filePath) {
  const data = await fs.readFile(filePath, 'utf8');
  let analyzer = new GiftParser(false, false);
  analyzer.parse(data);

  if (analyzer.errorCount === 0) {
    console.log("The .gift file is a valid gift file");
  } else {
    console.log("The .gift file contains error");
  }

  return analyzer.parsedQuestion;
}

async function displayFileNames(directory){
  try {
    // use readdir method to read the files of the directory
    const files = await fs.readdir(directory);

    files.forEach(async file => {
      // get the details of the file
      const fileDetails = await fs.lstat(path.resolve(directory, file));

      // check if the file is a directory
      if (fileDetails.isDirectory()) {
        console.log('Directory: ' + file);
      } else {
        console.log('File: ' + file);
      }
    });
  } catch (err) {
    console.error('Error reading directory:', err);
  }
}

async function processGiftFile(fileName) {
  try {
    const data = await fs.readFile("./parser/SujetB_data/" + fileName, 'utf8');
    const analyzer = new GiftParser(false, false);
    analyzer.parse(data);
    if (analyzer.errorCount === 0) {
      console.log(`${fileName} is a valid .gift file`);
    } else {
      console.log(`${fileName} contains errors`);
    }
    return analyzer.parsedQuestion;
  }
  catch (err) {
    console.error('Error processing files:', err);
    return null;
  }
}

program.run();
