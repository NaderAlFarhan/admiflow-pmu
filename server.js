const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();
app.use(express.json());

// ✅ استدعاء الملفات
const applicationRoutes = require('./routes/application');
const adminRoutes = require('./routes/admin');

// ✅ ربط المسارات
app.use('/', applicationRoutes);
app.use('/', adminRoutes);

// ✅ نقطة فحص رئيسية
app.get('/', (req, res) => {
  res.send('🚀 AdmiFlow – PMU API is Live!');
});

// ✅ تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
