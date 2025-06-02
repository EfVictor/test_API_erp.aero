import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Token from '../models/Token.js';
import { generateTokens } from '../utils/jwt.js';

export const signup = async (req, res) => {
  const { id, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ id, password: hash });

  const tokens = generateTokens(user.id);
  await Token.create({ token: tokens.refreshToken, userId: user.id });
  res.json(tokens);
};

export const signin = async (req, res) => {
  const { id, password } = req.body;
  const user = await User.findByPk(id);
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(403).json({ error: 'Invalid credentials' });

  const tokens = generateTokens(user.id);
  await Token.create({ token: tokens.refreshToken, userId: user.id });
  res.json(tokens);
};

export const newToken = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const tokenRecord = await Token.findOne({ where: { token: refreshToken, isValid: true } });
    if (!tokenRecord) return res.status(403).json({ error: 'Invalid refresh token' });

    const tokens = generateTokens(decoded.id);
    await Token.create({ token: tokens.refreshToken, userId: decoded.id });
    res.json(tokens);
  } catch {
    res.status(403).json({ error: 'Invalid refresh token' });
  }
};

export const info = (req, res) => {
  res.json({ id: req.user.id });
};

export const logout = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  await Token.update({ isValid: false }, { where: { token } });
  res.json({ message: 'Logged out' });
};
