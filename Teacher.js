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

module.exports = Teacher;
