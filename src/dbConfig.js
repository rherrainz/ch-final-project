import mongoose from 'mongoose'

const URI ='mongodb+srv://dbUser:Berta4552@cluster0.u5hn7vb.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose.set('strictQuery', false);

mongoose.connect(URI, (error) => {
  if (error) {
    console.log('Error al conectarse a la base de datos', error)
  }else{
    console.log('Conectado a la base de datos')
  }
})