
import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('MongoDB COnnected')
  } catch (error) {
    console.log(`Error ${error}`)
    process.exit(1)
  }
}

export default connectDB