/*
 * GET emails listing.
 */

var DocumentDBClient = require("documentdb").DocumentClient;
var nconf = require('nconf');

nconf 
    .file({ file: 'config.json' }) 
    .env(); 
    
var host = nconf.get("DocumentDB_host");      // Add your endpoint
var masterKey = nconf.get("DocumentDB_masterkey"); // Add the massterkey of the endpoint


var databaseId = "sample database";
var collectionId = "sample collection";


// create an instance of the DocumentDB client
var client = new DocumentDBClient(host, { masterKey: masterKey });


    


    

// query the provided collection for all non-complete items
var listItems = function (collection, callback) {
    client.queryDocuments(collection._self, 'SELECT * FROM root').toArray(function (err, docs) {
        if (err) {
            throw (err);
        }
        
        console.log(docs.length);
        
        callback(docs);
    });
}

// if the database does not exist, then create it, else return the database object
var readOrCreateDatabase = function (callback) {
    client.queryDatabases('SELECT * FROM root r WHERE r.id="' + databaseId + '"').toArray(function (err, results) {
        if (err) {
            // some error occured, rethrow up
            throw (err);
        }
        if (!err && results.length === 0) {
            // no error occured, but there were no results returned 
            // indicating no database exists matching the query            
            client.createDatabase({ id: databaseId }, function (err, createdDatabase) {
                callback(createdDatabase);
            });
        } else {
            // we found a database
            callback(results[0]);
        }
    });
};

// if the collection does not exist for the database provided, create it, else return the collection object
var readOrCreateCollection = function (database, callback) {
    client.queryCollections(database._self, 'SELECT * FROM root r WHERE r.id="' + collectionId + '"').toArray(function (err, results) {
        if (err) {
            // some error occured, rethrow up
            throw (err);
        }
        if (!err && results.length === 0) {
            // no error occured, but there were no results returned 
            //indicating no collection exists in the provided database matching the query
            client.createCollection(database._self, { id: collectionId }, function (err, createdCollection) {
                callback(createdCollection);
            });
        } else {
            // we found a collection
            callback(results[0]);
        }
    });
};


    // before we can query for Items in the document store, we need to ensure we 
    // have a database with a collection then use the collection to read the documents
    readOrCreateDatabase(function (database) {
        readOrCreateCollection(database, function (collection) {
            listItems(collection, function (items) {
                //res.render('index', { title: 'My ToDo List', tasks: items });
                console.log(items[0]);
            });
        });
    });