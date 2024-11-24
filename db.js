// db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  // Define una función asíncrona para conectar a la base de datos.

  try {
    // Intenta conectarse a MongoDB en la URL especificada.
    const url =
      "mongodb+srv://admin:1234@cluster0.qchhf.mongodb.net/Escuela?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(url);
    // console.log("Conectado a MongoDB"); // Imprime un mensaje si la conexión es exitosa.
  } catch (err) {
    console.error("Error de conexión a MongoDB:", err); // Imprime el error si la conexión falla.
    process.exit(1); // Termina el proceso si no se puede conectar a la base de datos.
  }
};

const disconnectDB = async () => {
  try{
    await mongoose.connection.close
  }catch (err){

  }
}

module.exports = {connectDB,disconnectDB}; // Exporta la función para que pueda ser utilizada en otros módulos.
