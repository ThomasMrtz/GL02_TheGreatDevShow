const Profile = require('./Profile');

const profile = new Profile(4, 10, 3, 5, 6, 2);
const anotherProfile = new Profile(4, 5, 9, 2, 6, 1);

profile.visualize();
profile.compare(anotherProfile);