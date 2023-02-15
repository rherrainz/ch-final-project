import mongoose from 'mongoose'
import 'dotenv/config'

const URI = process.env.MONGO_URI;

mongoose.set('strictQuery', false);

mongoose.connect(URI, (error) => {
  if (error) {
    console.log('Error al conectarse a la base de datos', error)
  }else{
    console.log('Conectado a la base de datos')
  }
})