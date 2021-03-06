//required the mongoose for the connection with ENV variables
const { connect, connection } = require('mongoose');

const connectionString =
    process.env.MONGODB_URI || 'mongodb://localhost:27017/socialpiDB';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


module.exports = connection;
