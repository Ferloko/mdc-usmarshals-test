const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mdc_database';

console.log('🔄 Intentando conectar a MongoDB...');
console.log('📍 URI:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@')); // Ocultar contraseña en logs

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ ¡Conexión exitosa a MongoDB!');
    console.log('📊 Base de datos:', mongoose.connection.name);
    console.log('🌐 Host:', mongoose.connection.host);
    console.log('🔌 Puerto:', mongoose.connection.port);
    
    // Cerrar la conexión
    mongoose.connection.close();
    console.log('\n✅ Prueba completada. El servidor está listo para usarse.');
    process.exit(0);
})
.catch((err) => {
    console.error('❌ Error al conectar a MongoDB:');
    console.error(err.message);
    console.log('\n💡 Soluciones posibles:');
    console.log('1. Asegúrate de que MongoDB esté corriendo (si es local)');
    console.log('2. Verifica que la URI en el archivo .env sea correcta');
    console.log('3. Si usas MongoDB Atlas, verifica tu IP en la whitelist');
    console.log('4. Reemplaza <db_password> con tu contraseña real en el archivo .env');
    process.exit(1);
});
