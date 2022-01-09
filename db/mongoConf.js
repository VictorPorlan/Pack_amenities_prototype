var mongoose = require('mongoose');
var environment = process.env.NODE_ENV || 'development';

var databaseUri = {
    
    production: `mongodb+srv://packs:packs@packs.gvt0s.mongodb.net/packs?retryWrites=true&w=majority`,

    development: `mongodb+srv://packs:packs@packs.gvt0s.mongodb.net/packs?retryWrites=true&w=majority`,
    
    test: `mongodb+srv://packs:packs@packs.gvt0s.mongodb.net/packs_test?retryWrites=true&w=majority`
}
module.exports = {
    mongoose,
    connect: () => {
        mongoose.Promise = Promise;
        mongoose.connect(databaseUri[environment], { useNewUrlParser: true , useUnifiedTopology: true});
    },
    disconnect: done => {
        mongoose.disconnect(done);
    }
};