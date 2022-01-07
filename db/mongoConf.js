var mongoose = require('mongoose');
var databaseUri = {
    
    production: `mongodb+srv://packs:packs@packs.gvt0s.mongodb.net/packs?retryWrites=true&w=majority`,

    development: `mongodb+srv://packs:packs@packs.gvt0s.mongodb.net/packs?retryWrites=true&w=majority`,
    
    test: `mongodb+srv://packs:packs@packs.gvt0s.mongodb.net/packs?retryWrites=true&w=majority`
}
module.exports = {
    mongoose,
    connect: () => {
        mongoose.Promise = Promise;
        mongoose.connect('mongodb+srv://packs:packs@packs.gvt0s.mongodb.net/packs?retryWrites=true&w=majority');
    },
    disconnect: done => {
        mongoose.disconnect(done);
    }
};