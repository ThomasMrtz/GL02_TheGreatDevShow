const fs = require('fs');

class Teacher {
  constructor(name, course, phoneNumber, email, address) {
    this.fullName = name;
    this.course = course;
    this.tel = phoneNumber;
    this.email = email;
    this.address = address;
  }

  generateVCard() {
    const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${this.fullName}
TEL:${this.tel}
EMAIL:${this.email}
ADR:${this.address}
ORG:${this.course} Teacher
END:VCARD
`;

    const filePath = `./${this.fullName.replace(/\s/g, '_')}_vcard.vcf`;

    fs.writeFile(filePath, vCardData, (err) => {
      if (err) {
        console.error('Error writing vCard file:', err);
      } else {
        console.log(`vCard file created successfully: ${filePath}`);
      }
    });
  }
}

// Parse command-line arguments
const [, , name, course, phoneNumber, email, address] = process.argv;

// Check if all required arguments are provided
if (name && course && phoneNumber && email && address) {
  // Create an instance of the Teacher class with command-line arguments
  const teacher = new Teacher(name, course, phoneNumber, email, address);

  // Call the generateVCard method
  teacher.generateVCard();
} else {
  console.error('Usage: node teacher.js [name] [course] [phoneNumber] [email] [address]');
}
