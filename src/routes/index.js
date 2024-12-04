import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { tools } from '../data/tools.js';

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    req.session.isAuthenticated = true;
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
});

router.get('/dashboard', requireAuth, (req, res) => {
  res.render('dashboard', { tools });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

export default router;