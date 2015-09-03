var DocumentClient = require('documentdb-q-promises').DocumentClientWrapper;
var nconf = require('nconf');

nconf 
    .file({ file: 'config.json' }) 
    .env(); 
    
var host = nconf.get("DocumentDB_host");      // Add your endpoint
var masterKey = nconf.get("DocumentDB_masterkey"); // Add the massterkey of the endpoint
var client = new DocumentClient(host, {masterKey: masterKey});

var databaseDefinition = { id: "sample database" }
var collectionDefinition = { id: "sample collection" };
var documentDefinition = { id: "hello world doc", content: "Hello World!" };

var database, collection, document;
client.createDatabaseAsync(databaseDefinition)
    .then(function(databaseResponse) {
        database = databaseResponse.resource;
        return client.createCollectionAsync(database._self, collectionDefinition);
    })
    .then(function(collectionResponse) {
        collection = collectionResponse.resource;
        return client.createDocumentAsync(collection._self, documentDefinition);
    })
    .then(function(documentResponse) {
        var document = documentResponse.resource;
        console.log('Created Document with content: ', document.content);
        //cleanup(client, database);
    })
    .fail(function(error) {
        console.log("An error occured", error);
    });

function cleanup(client, database) {
    client.deleteDatabaseAsync(database._self)
        .then(function(response) {
            console.log('clean up completed');
        })
        .fail(function(error){
            console.log(error);
        });
}