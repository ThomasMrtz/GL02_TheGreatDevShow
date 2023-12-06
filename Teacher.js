const fs = require('fs');

class Teacher {
  constructor(name, course, phoneNumber, email, address) {
    this.fullName = String(name).replace(/\s/g, '_');
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
    const repoPath = `./Test/${this.fullName}`
    fs.mkdir(repoPath, (err) => {
        if (err) {
        console.error(err);
        } else {
        // Création réussie !
        }
    });   
    const filePath = `${repoPath}/${this.fullName}_vcard.vcf`;

    fs.writeFile(filePath, vCardData, (err) => {
      if (err) {
        console.error('Error writing vCard file:', err);
      } else {
        //création réussie
    }
    });
  }
}

module.exports = Teacher;
