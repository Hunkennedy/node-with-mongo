import Mongoose from "mongoose";

Mongoose.connect("mongodb://localhost/productsdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: true,
    // useCreateIndex: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log('Error!', err))