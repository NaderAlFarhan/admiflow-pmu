
const express = require('express');
const router = express.Router();
const applicationModule = require('./application');

// ✅ إحضار جميع الطلبات
router.get('/admin/applications', (req, res) => {
  res.json(applicationModule.applications || []);
});

module.exports = router;
