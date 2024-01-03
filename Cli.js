const Teacher = require("./model/Teacher");
const GiftParser = require("./parser/giftParser");
const { program } = require("@caporal/core");
const QuestionBank = require("./model/QuestionBank");
const TypeQuestion = require("./model/TypeQuestion");
const prompt = require("prompt-sync")();
const fs = require("fs").promises; // Use promises version of fs
const Profile = require("./model/Profile");
const path = require("path");
const Test = require("./model/Test");

const DATA_DIRECTORY = "./parser/SujetB_data/";

program
  .command(
    "createTest",
    "Create an empty test and stores teacher's information"
  )
  .action(async () => {
    const teacher = await getTeacherInfo();
    const testname = prompt("Test name: ").replace(/\s/g, "_");
    try {
      await fs.mkdir("./TestBank", { recursive: true });
      await fs.mkdir("./Test", { recursive: true });
    } catch (error) {
      console.error("Error:", error.message);
    }
    teacher.generateVCard();
    console.log("vCard created successfully.");

    try {
      await saveToFile("", `./Test/${teacher.fullName}/${testname}.gift`);
      console.log(`Test created successfully.`);
    } catch (error) {
      console.error("Error creating test:", error.message);
    }
  })

  .command(
    "readTest",
    "Visualize the questions of a test (unfinished or not)"
  )
  .argument("<directory>", "Test directory for unfinished tests and the TestBank directory for the finished ones")
  .action(async ({ args }) => {
    if (args.directory != "Test" && args.directory != "TestBank") {
      console.error("The argument should be either Test or TestBank!");
      return;
    }
    const teachername = prompt("Teacher's name: ").replace(/\s/g, "_");
    console.log("Theacher's files:");
    await displayFileNames(`./${args.directory}/${teachername}/`);
    const testname = prompt("Test name: ").replace(/\s/g, "_");
    try {
      const data = await parseData(`./${args.directory}/${teachername}/${testname}.gift`);
      for (let i = 0; i < data.length; i++) {
        console.log("Question " + i + ": ");
        data[i].visualise();
        console.log("\n \n");
      }
    } catch (error) {
      console.error("Error :", error.message);
    }
  })

  .command("addQuestion", "Add a question to a test")
  .action(async () => {
    const teachername = prompt("Teacher's name: ").replace(/\s/g, "_");
    console.log("Theacher's files:");
    await displayFileNames("./Test/" + teachername + "/");
    const testname = prompt("Test name: ").replace(/\s/g, "_");

    try {
      const questions = await parseData(`./Test/${teachername}/${testname}.gift`);
      console.log("Questions from test: ");
      if(questions.length == 0)console.log("No questions yet.");
      for (let i = 0; i < questions.length; i++) {
        console.log("Question " + i + ": ");
        questions[i].visualise();
        console.log("\n \n");
      }
      const question = await getQuestionsFromTeacher();
      const giftFormat = question.gift_format;
      const data = await parseData(`./Test/${teachername}/${testname}.gift`);
      if (data.length >= 20) {
        console.log(
          "file contains 20 questions already. You can't add question anymore"
        );
      } else {
        await fs.appendFile(
          `./Test/${teachername}/${testname}.gift`,
          giftFormat
        );
        console.log("Question added successfully");
      }
    } catch (error) {
      console.error("Error adding question: ", error.message);
    }
  })

  .command("rmQuestion", "Remove a question from a test")
  .action(async () => {
    const teachername = prompt("Teacher's name: ").replace(/\s/g, "_");
    console.log("Theacher's files:");
    await displayFileNames("./Test/" + teachername + "/");
    const testname = prompt("Test name: ").replace(/\s/g, "_");
    try {
      const data = await parseData(`./Test/${teachername}/${testname}.gift`);
      for (let i = 0; i < data.length; i++) {
        console.log("Question " + i + ": ");
        data[i].visualise();
        console.log("\n \n");
      }
      const idx = prompt("enter the index of the question you want to remove");
      data.splice(idx, 1);
      await fs.rename(
        `./Test/${teachername}/${testname}.gift`,
        `./Test/${teachername}/${testname}.gift`
      );
    } catch (error) {
      console.error("Error adding question: ", error.message);
    }
  })

  .command("takeTest", "Simulate a test from a student point of view")
  .action(async () => {
    const teachername = prompt("Teacher's name: ").replace(/\s/g, "_");
    await displayFileNames("./TestBank/" + teachername + "/");
    const testname = prompt("Test name: ").replace(/\s/g, "_");

    var testFile = `./TestBank/${teachername}/${testname}.gift`;

    // read questions from file and store them in a test object
    var testQuestions = await parseData(testFile);
    var test = new Test();
    test.addMore(testQuestions);

    test.simulate();
  })

  .command("read", "Reads the question bank")
  .action(async () => {
    try {
      const data = await parseData(`./questionBank/questionBank.gift`);
      for (let i = 0; i < data.length; i++) {
        console.log("Question " + i + ": ");
        data[i].visualise();
        console.log("\n \n");
      }
    } catch (error) {
      console.error("Error :", error.message);
    }
  })

  .command("finish", "Verify if a test has between 15 and 20 unique questions")
  .action(async () => {
    const teachername = prompt("Teacher's name: ").replace(/\s/g, "_");
    console.log("Teacher's files:");
    await displayFileNames("./Test/" + teachername + "/");
    const testname = prompt("Test name: ").replace(/\s/g, "_");
    try {
      const data = await parseData(`./Test/${teachername}/${testname}.gift`);
      let isEveryQuestionUnique = true;
      for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
          if (data[i].title == data[j].title) {
            isEveryQuestionUnique = false;
            data.splice(j, 1);
            j--;
          }
        }
      }
      if (!isEveryQuestionUnique) {
        fs.unlink(`./Test/${teachername}/${testname}.gift`);
        for (let i = 0; i < data.length; i++) {
          fs.appendFile(
            `./Test/${teachername}/${testname}.gift`,
            data[i].gift_format
          );
        }
        console.log(
          "Multiple identic questions. File corrected. Please retry."
        );
      } else if (
        data.length > 15 &&
        data.length <= 20 &&
        isEveryQuestionUnique
      ) {
        await fs.rename(
          `./Test/${teachername}/${testname}.gift`,
          `./TestBank/${teachername}/${testname}.gift`
        );
      } else {
        console.log(
          `this test has ${data.length} questions, a test has to have between 15 and 20 questions`
        );
      }
    } catch (error) {
      console.error("Error :", error.message);
      return null;
    }
  })

  .command("loadQB", "Load questions from a GIFT file into the question bank")
  .argument(
    "<file>",
    "The file containing questions to add to the question bank"
  )
  .action(async ({ args }) => {
    try {
      await fs.mkdir("./questionBank", { recursive: true });
      const data =
        (await fs.readFile("./parser/SujetB_data/" + args.file, "utf8")) + "\n";
      await fs.appendFile("./questionBank/questionBank.gift", data);
      console.log("File appended successfully.");
    } catch (error) {
      console.error("Error loading questions:", error.message);
    }
  })

  .command("displayFileNames", "Display the list of all GIFT files provided by the SRYEM services")
  .action(() => displayFileNames(DATA_DIRECTORY))

  .command(
    "displayTeacherFileNames",
    "Display the vCard and the (un)finished tests of the specific teacher"
  )
  .argument("<directory>", "Test (unfinished tests) or TestBank (finished tests)")
  .argument("[teacher...]", "The teacher's name")
  .action(async ({ args }) => {
    try {
      const dir = args.directory;
      const teacher = args.teacher.join('_') || 'Sryem Admin'; // Use a default name if not provided
      const directory = `./${dir}/${teacher}/`;

      await displayFileNames(directory);
    } catch (error) {
      console.error('Error:', error.message);
    }
  })

  .command(
    "visualizeProfile",
    "Generate a profile histogram based on one or more GIFT files"
  )
  .argument("[files...]", "The files containing the questions to analyze")
  .action(async ({ args }) => {
    const qb = new QuestionBank([]);

    try {
      // Use Promise.all to wait for all file processing tasks to complete
      await Promise.all(
        args.files.map(async (file) => {
          const fileQuestions = await parseData("./parser/SujetB_data/" + file);
          if (fileQuestions != null) {
            qb.addMore(fileQuestions);
          } else {
            console.error("Error while processing GIFT file " + file);
          }
        })
      );

      const qbProfile = qb.createProfile();
      console.log(qbProfile);

      await qbProfile.visualize();
    } catch (err) {
      console.error("Error during visualizing:", err);
    }
  })

  .command(
    "compare",
    "Compare profile of a test made by a professor with the average profile of one or several gift files with questions"
  )
  .argument("[files...]", "The files used to create the question bank")
  .action(async ({ args }) => {
    const teacherName = prompt("Enter teacher name: ").replace(/\s/g, "_");
    // check if TestBank directory exists
    try {
      await fs.readdir("./TestBank/");
    } catch (err) {
      console.log(
        "TestBank directory doesn't exist yet! Tests must be finished in order to be saved to this directory."
      );
    }

    // check if teacher name directory exists in TestBank directory and display its files if valid
    try {
      await displayFileNames("./TestBank/" + teacherName + "/");
    } catch (err) {
      console.log(
        "The teacher " +
          teacherName +
          " didn't finish any tests yet or the name is invalid!"
      );
    }
    const testFileName = prompt(
      "Enter a test file name (with the extention .gift): "
    );

    const testQuestions = await parseData(
      "./TestBank/" + teacherName + "/" + testFileName
    );

    const test = new Test(formatFileName(testFileName), teacherName);
    test.addMore(testQuestions);

    const testProfile = test.createProfile();

    let profiles = [];

    try {
      // Use Promise.all to wait for all file processing tasks to complete
      await Promise.all(
        args.files.map(async (file) => {
          const fileQuestions = await parseData("./parser/SujetB_data/" + file);
          if (fileQuestions != null) {
            profiles.push(new QuestionBank(fileQuestions).createProfile());
          } else {
            console.error("Error while processing GIFT file " + file);
          }
        })
      );
    } catch (err) {
      console.error("Error during visualizing:", err);
    }

    let avgMC = 0;
    let avgTF = 0;
    let avgM = 0;
    let avgMW = 0;
    let avgNum = 0;
    let avgOQ = 0;

    profiles.forEach(profile => {
      avgMC += profile.mc;
      avgTF += profile.tf;
      avgM += profile.m;
      avgMW += profile.mw;
      avgNum += profile.num;
      avgOQ += profile.oq;
    })
    
    let len = profiles.length;

    avgMC /= len;
    avgTF = len;
    avgM /= len;
    avgMW /= len;
    avgNum /= len;
    avgOQ /= len;

    testProfile.compare(
      new Profile(
        'Average Question Bank',
        avgMC,
        avgTF,
        avgM,
        avgMW,
        avgNum,
        avgOQ
      ));
  });

async function getTeacherInfo() {
  console.log("Enter teacher information:");
  const name = prompt("Name: ");
  const course = prompt("Teaching course: ");
  const phoneNumber = prompt("Phone number: ");
  const email = prompt("Email address: ");
  const address = prompt("Address: ");
  return new Teacher(name, course, phoneNumber, email, address);
}

async function getQuestionsFromTeacher() {
  try {
    const data = await parseData("./questionBank/questionBank.gift");
    console.log("Enter question index for the test:");
    const qindex = parseInt(prompt(`Question index: `));

    const question = data[qindex]; //.find((q) => q.title === qname);
    if (question) {
      console.log("Question found:");
      console.log(question);
      return question;
    } else {
      console.log("Question not found");
      return null;
    }
  } catch (error) {
    console.error("Error getting questions:", error.message);
    return null;
  }
}

async function saveToFile(data, filename) {
  await fs.writeFile(filename, data);
}

async function parseData(filePath) {
  const data = await fs.readFile(filePath, "utf8");
  let analyzer = new GiftParser(false, false);
  analyzer.parse(data);

  if (analyzer.errorCount != 0) {
    console.log("The .gift file contains errors.");
  }

  return analyzer.parsedQuestion;
}

async function displayFileNames(directory) {
  try {
    const files = await fs.readdir(directory);

    for (const file of files) {
      const filePath = path.resolve(directory, file);
      const fileDetails = await fs.lstat(filePath);

      if (fileDetails.isDirectory()) {
        console.log("Directory: " + file);
      } else {
        console.log("File: " + file);
      }
    }
  } catch (err) {
    console.error("Error reading directory:", err);
  }
}

function formatFileName(fileName) {
  // Get the base name without the extension
  const baseName = path.basename(fileName, path.extname(fileName));

  // Replace underscores with spaces
  const formattedName = baseName.replace(/_/g, ' ');

  return formattedName;
}

program.run();
