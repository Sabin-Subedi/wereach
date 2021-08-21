import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()

import { bucket } from '../firebase.js'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const file = await req.file

    const result = await bucket.upload(file.path, {
      public: true,
    })

    const image = await bucket.file(result[0].metadata.name)

    res.status(200).json({ imagePath: image.publicUrl() })
  } catch (error) {
    console.log(error)
  }
})

export default router
