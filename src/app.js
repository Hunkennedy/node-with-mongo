import Express from "express";
import Morgan from "morgan";
import pkg from '../package.json';


const app = Express();


app.set('pkg', pkg);
app.use(Morgan('dev'));

app.get('/', (req, res) => {
    res.json({
        Name: app.get('pkg').name,
        Author: app.get('pkg').author,
        Description: app.get('pkg').description,
        Version: app.get('pkg').version
    });
})


export default app;