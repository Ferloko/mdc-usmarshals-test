const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
    try {
        console.log('🔍 Probando conexión a MongoDB...');
        console.log('📊 MONGODB_URI:', process.env.MONGODB_URI);

        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('✅ Conexión exitosa');

        // Verificar fichas
        const fichas = await mongoose.connection.db.collection('fichas').find({}).toArray();
        console.log(`📋 Fichas encontradas: ${fichas.length}`);

        // Verificar cargos
        const cargos = await mongoose.connection.db.collection('cargos').find({}).toArray();
        console.log(`📋 Cargos encontrados: ${cargos.length}`);

        await mongoose.connection.close();
        console.log('🔌 Conexión cerrada');

    } catch (error) {
        console.error('❌ Error de conexión:', error.message);
        process.exit(1);
    }
}

testConnection();
