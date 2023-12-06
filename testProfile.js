const AverageProfile = require('./Profile');

const profile = new AverageProfile(4, 10, 3, 5, 6, 2);
const otherProfile =  new AverageProfile(9, 10, 5, 2, 7, 1);

console.log(profile);
profile.generateComparisonChart(otherProfile);