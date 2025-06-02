import File from '../models/File.js';
import fs from 'fs';
import path from 'path';

export const upload = async (req, res) => {
  const file = req.file;
  const newFile = await File.create({
    name: file.originalname,
    extension: path.extname(file.originalname),
    mime: file.mimetype,
    size: file.size,
    uploadDate: new Date(),
    path: file.path,
  });
  res.json(newFile);
};

export const list = async (req, res) => {
  const page = parseInt(req.query.page || 1);
  const list_size = parseInt(req.query.list_size || 10);
  const offset = (page - 1) * list_size;
  const files = await File.findAll({ limit: list_size, offset });
  res.json(files);
};

export const info = async (req, res) => {
  const file = await File.findByPk(req.params.id);
  if (!file) return res.status(404).json({ error: 'File not found' });
  res.json(file);
};

export const download = async (req, res) => {
  const file = await File.findByPk(req.params.id);
  if (!file) return res.status(404).json({ error: 'File not found' });
  res.download(file.path, file.name);
};

export const remove = async (req, res) => {
  const file = await File.findByPk(req.params.id);
  if (!file) return res.status(404).json({ error: 'File not found' });
  fs.unlinkSync(file.path);
  await file.destroy();
  res.json({ message: 'Deleted' });
};

export const update = async (req, res) => {
  const file = await File.findByPk(req.params.id);
  if (!file) return res.status(404).json({ error: 'File not found' });

  fs.unlinkSync(file.path);
  const newFile = req.file;
  file.name = newFile.originalname;
  file.extension = path.extname(newFile.originalname);
  file.mime = newFile.mimetype;
  file.size = newFile.size;
  file.uploadDate = new Date();
  file.path = newFile.path;

  await file.save();
  res.json(file);
};
