const bcrypt = require("bcrypt");

async function passwordTest() {
    const hash = await bcrypt.hash('123456', 10);
    // Store hash in the database
    console.log('hash is', hash);

    const valid = await bcrypt.compare('123456', hash);
    console.log('is valid', valid);
}

passwordTest()

