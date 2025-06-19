// server.js – AdmiFlow PMU Backend Server

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// 🧠 لتحليل JSON من الطلبات
app.use(express.json());

// ✅ استدعاء ملفات التكامل
require('dotenv').config();

// ✅ استدعاء واجهات التقديم وتتبع الطلب
const applicationRoutes = require('./routes/application');
app.use('/', applicationRoutes);

// ✅ نقطة فحص رئيسية
app.get('/', (req, res) => {
  res.send('AdmiFlow – PMU API is live 🎓');
});

// ✅ تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
