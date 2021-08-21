import admin from 'firebase-admin'
import config from './firebaseConfig.js'
import dotenv from 'dotenv'

dotenv.config()


const app = admin.initializeApp({
  credential: admin.credential.cert(config),
  storageBucket: `gs://civism-1d244.appspot.com/`,
})

const bucket = app.storage().bucket()

export { bucket }
