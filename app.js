require('dotenv').config()
const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const app =  express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

require("./routes/auth.js")(app);
require("./routes/users.js")(app);
require("./routes/tasks.js")(app);
require("./routes/deals.js")(app);
require("./routes/contacts.js")(app);
require("./routes/activities.js")(app);
require("./routes/accounts.js")(app);
require("./routes/auth.js")(app);

app.listen(8081);
console.log("Server Working")
