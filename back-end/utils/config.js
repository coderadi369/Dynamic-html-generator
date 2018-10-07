const config = {
    'port': 4000,
    client: {
        mongodb: {
            defaultDatabase: "Signzyben",
            defaultCollection: "htmldata",
            defaultUri: "mongodb://localhost:27017"
        }
    }
}
module.exports = {
    config
}