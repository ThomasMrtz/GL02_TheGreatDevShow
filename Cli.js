const Teacher = require('./teacher');
const GiftParser = require('./parser/giftParser');
const question = require('./parser/Question')

const { program } = require('@caporal/core');
const prompt = require('prompt-sync')();
const fs= require('fs');
const Question = require('./parser/Question');




program
  .command('createTest', 'create a test by asking for teacher information and questions')
  .action(async () => {
    const teacher = await getTeacherInfo();
    const testname = prompt('test name:').replace(/\s/g, '_');

    teacher.generateVCard();
    console.log('vCard created successfully.');
    saveToFile('', `./Test/${teacher.fullName}/${testname}.gift`);
    console.log(`Test created successfully.`);
  })

  .command('addquestion', 'add a question to a test')
  .action(async () => {
    const teachername = prompt('teacher\'s name : ').replace(/\s/g, '_')
    const testname = prompt('test name : ').replace(/\s/g, '_');
    const question = await getQuestionsFromTeacher();
    const giftFormat = convertToGiftFormat(question);

    fs.appendFile(`./Test/${teachername}/${testname}.gift`, giftFormat, function (err) {   if (err) throw err;   console.log('Fichier créé !');});
    console.log(`question added successfully.`);
  })

  .command('verfyTest', 'verify if a test has between 15 and 20 questions')
  .action(async () => {
    const teachername = prompt('teacher\'s name')
    const testname = prompt('test name:').replace(/\s/g, '_');
   // count question in gift file 
   //print if less / print if good / print if more
  });

async function getTeacherInfo() {

  console.log('Enter teacher information:');
  const name = prompt('Name: ');
  const course = prompt('Teaching course: ');
  const phoneNumber = prompt('Phone number: ');
  const email = prompt('Email address: ');
  const address = prompt('Address: ');
  const teacher=new Teacher(name, course, phoneNumber, email, address);

  return teacher;
}

async function getQuestionsFromTeacher() {
    console.log('Enter questions for the test:');
    const qname = prompt(`Question : `);
    const question = Question.findQuestion(qname);

  return question;
}

function convertToGiftFormat(questions) {
  const giftFormat = questions.map((question, index) => `::Question${index + 1}:: ${question}`).join('\n');
  return giftFormat;
}

function saveToFile(data, filename) {
  fs.writeFileSync(filename, data);
}

program.run();
