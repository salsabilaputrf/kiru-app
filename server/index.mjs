import express from 'express';

const app = express();
const PORT = 3000;
const HOST = 'localhost';

app.get('/', (req, res) => {
    res.status(200).send("Welcome to server Neng Tesla");
});

app.listen(PORT, HOST, (error) => {
    if (!error) {
        console.log(`Server is Successfully Running and App is listening on http://localhost:${PORT}`);
    } else {
        console.log("Error occurred, server can't start", error);
    }
});