import Express from "express";
const port = 4040;
const app = Express();



app.listen(port, () => console.log(`Server ON http://localhost:${port}`));