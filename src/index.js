import app from './app';
import './database';

const port = 4040;


app.listen(port, () => console.log(`Server ON http://localhost:${port}`));