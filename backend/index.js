const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
const app = express();
const port = process.env.PORT||5000;
connectToMongo();

app.use(express.json());
app.use(cors());

//My routes
app.use('/user/auth', require('./routes/auth'))
app.use('/user/notes', require('./routes/notes'))
app.get('/', (req, res) => {
    res.send('Hello world');
})
app.get('/test', (req, res) => {
    res.send('Test success');
})
app.listen(port, () => {
    console.log(`Listening at port http://localhost:${port}`);
})