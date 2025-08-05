const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let applications = [];
let documents = {};

// ✅ تقديم طلب – POST /apply
router.post('/apply', (req, res) => {
  const { name, email, phone, gpa, qudrat, tahseely, ielts } = req.body;

  if (!name || !email || !phone || !gpa || !qudrat || !tahseely) {
    return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
  }

  const appId = uuidv4();
  applications.push({
    id: appId,
    name,
    email,
    phone,
    gpa,
    qudrat,
    tahseely,
    ielts,
    status: 'قيد المراجعة',
    submittedAt: new Date().toISOString()
  });

  return res.status(200).json({ message: 'تم تقديم الطلب بنجاح', applicationId: appId });
});

// ✅ رفع مستند – POST /upload-document
router.post('/upload-document', (req, res) => {
  const { applicationId, type, fileData } = req.body;

  if (!applicationId || !type || !fileData) {
    return res.status(400).json({ error: 'يجب إدخال جميع البيانات' });
  }

  if (!documents[applicationId]) documents[applicationId] = [];
  documents[applicationId].push({ type, fileData });

  return res.json({ message: 'تم رفع المستند بنجاح' });
});

// ✅ تتبع الطلب – GET /track-status
router.get('/track-status', (req, res) => {
  const { applicationId, email } = req.query;

  let app = applicationId
    ? applications.find(a => a.id === applicationId)
    : applications.find(a => a.email === email);

  if (!app) return res.status(404).json({ error: 'الطلب غير موجود' });

  return res.json({
    status: app.status,
    submittedAt: app.submittedAt,
    applicationId: app.id
  });
});

// ✅ عرض جميع الطلبات – GET /admin/applications
router.get('/admin/applications', (req, res) => {
  res.json(applications); // إرجاع جميع الطلبات من الذاكرة
});

module.exports = router;

// 🛠️ إتاحة البيانات المشتركة لمسارات المسؤول
module.exports.applications = applications;
module.exports.documents = documents;
