const express = require('express');
const connection = require('./config/database.js');
const { authRouter } = require('./routes/auth.js');
const { expenseRoute } = require('./routes/expenses.js');
const cookieParser = require('cookie-parser');

connection();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/expense', expenseRoute)

app.listen(3000, () => console.log("server is running on port 3000"));