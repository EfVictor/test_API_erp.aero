import express from 'express';
import uploadFile from '../middlewares/multer.js';
import {
  upload,
  list,
  info,
  download,
  remove,
  update,
} from '../controllers/fileController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/upload', auth, uploadFile.single('file'), upload);
router.get('/list', auth, list);
router.get('/:id', auth, info);
router.get('/download/:id', auth, download);
router.delete('/delete/:id', auth, remove);
router.put('/update/:id', auth, uploadFile.single('file'), update);

export default router;
