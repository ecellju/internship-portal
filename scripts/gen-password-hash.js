const bcrypt = require('bcrypt');

const plainTextPassword = process.argv[2];

bcrypt.genSalt((saltError, salt) => {
  if (saltError) {
    console.log(saltError);
    return;
  }

  bcrypt.hash(plainTextPassword, salt, (hashError, hash) => {
    if (hashError) {
      console.log(hashError);
      return;
    }

    console.log(`hash: ${hash}`);
  });
});
