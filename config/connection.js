const moongose = require("mongoose");

const dbConnection = async () => {
    try {
        await moongose.connect(`mongodb+srv://gorlekk:HVN49DaNQxfa0nI8@clusterprueba.lafcpyl.mongodb.net/Weather?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Base de datos online');
    } catch (error) {
        throw new Error('Error al inicializar la base de datos');
    }
}

module.exports = {
    dbConnection
}