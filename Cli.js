const { program } = require('@caporal/core');
const Teacher = require('./teacher'); // Import the Teacher class

program
  .version('1.0.0')
  .description('CLI for generating vCards')
  .argument('<name>', 'Teacher\'s name')
  .argument('<course>', 'Teaching course')
  .argument('<phoneNumber>', 'Phone number')
  .argument('<email>', 'Email address')
  .argument('<address>', 'Address')
  .action(({ args }) => {
    

// Check if all required arguments are provided
if (args.name && args.course && args.phoneNumber && args.email && args.address) {
    // Create an instance of the Teacher class with command-line arguments
    const teacher = new Teacher(
        args.name,
        args.course,
        args.phoneNumber,
        args.email,
        args.address
        );
    // Call the generateVCard method
    teacher.generateVCard();
  } else {
    console.error('Usage: node teacher.js [name] [course] [phoneNumber] [email] [address]');
  }  });

program.run();