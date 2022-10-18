const mongoose = require('mongoose');

const clientOptions = {
    socketTimeoutMS   : 30000,
    keepAlive         : true,
    useNewUrlParser   : true,
    useUnifiedTopology: true,
    dbName            : 'apinode'
};

exports.initClientDbConnection = async () => {
    
    try {
        await mongoose.connect(process.env.URL_MONGO, clientOptions)
        console.log('Connected');
    } catch (error) {
        console.log(error);
        throw error;
    }
}