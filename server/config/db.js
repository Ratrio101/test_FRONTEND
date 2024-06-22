const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/culinaryapp', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB успешно фурычит...Ура!');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;