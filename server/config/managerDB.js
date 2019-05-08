const fs = require('fs');
const { Writable } = require('stream');

/*
 * Function loadFromMongo upload collection from MongoDB to .json file;
 * Add after connection event to db;
 * @params:
 *  file: file name, where should will be save collection ,
 *  mongooseModel: model using Mongoose
 */
const loadFromMongo = function(config) {
    // create writeStream with path from config
    const writeStream = fs.createWriteStream(config.file);

    // create stream from mongodb collection
    const readStreamFromMongo = config.mongooseModel.find().stream();

    let counter = 0;
    let JSON_FINISH_OBJECT = {};

    readStreamFromMongo.on('data', (chunk) => {
        counter++;
        JSON_FINISH_OBJECT[`${counter}`] = JSON.parse(JSON.stringify(chunk));
    });

    readStreamFromMongo.on('finish', () => writeStream.write(JSON.stringify(JSON_FINISH_OBJECT)));
};

/*
 * Function watchLocalDbFiles upload data from .json to MongoDB;
 * Use fs.watchFile;
 * @params:
 *  file: file name, where should will be save collection ,
 *  mongooseModel: model using Mongoose
 */
const watchLocalDbFiles = function(config) {

    fs.watchFile(config.file, (curr, prev) => {
        if (curr !== prev) {
            const WriteStream = new Writable({
                write(chunk, encoding, callback) {

                    const collection = JSON.parse(chunk.toString());

                    for( let item in collection){
                        let collectionItem = collection[item];

                        if(!collectionItem._id) {
                            const newCollectionItem = new config.mongooseModel(collectionItem);
                            newCollectionItem.save().then(() => loadFromMongo(config));
                        }
                        try {
                            config.mongooseModel.updateMany({_id: collectionItem._id}, collectionItem)
                                .then(res => { console.log(res)});
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    callback();
                }
            });
            fs.createReadStream(config.file).pipe(WriteStream);
        }
    });
};

const managerMongo = {
    loadFromMongo,
    watchLocalDbFiles
};

module.exports = managerMongo;