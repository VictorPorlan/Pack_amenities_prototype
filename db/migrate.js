const {MongoClient} = require("mongodb");

const packsCollection = require("./packsCollection")
const itemsCollection = require("./itemsCollection")

var uri = `mongodb+srv://packs:packs@packs.gvt0s.mongodb.net/packs?retryWrites=true&w=majority`;

const client = new MongoClient(uri);
async function run() {
    try {
        await client.connect();

        const database = client.db('packs_test');
        const packs = database.collection('packs');
        const items = database.collection('items');

        let numpacksDocs = await packs.estimatedDocumentCount();
        if (numpacksDocs > 0) {
            await packs.drop().then((successMessage) => {
                console.log("Packs " + successMessage);
            })
        }

        let numItemsDocs = await items.estimatedDocumentCount();
        if (numItemsDocs > 0) {
            await items.drop().then((successMessage) => {
                console.log("Items " + successMessage);
            })
        }

        let result = await items.insertMany(itemsCollection);

        result = await packs.insertMany(packsCollection);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);