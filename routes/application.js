const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let applications = [];
let documents = {};

// ✅ /apply – تقديم طلب
router.post('/apply', (req, res) => {
  const { name, email, phone, gpa, qudrat, tahseely, ielts } = req.body;

  if (!name || !email || !phone || !gpa || !qudrat || !tahseely || !ielts) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const appId = uuidv4();
  applications.push({
    id: appId, name, email, phone, gpa, qudrat, tahseely, ielts,
    status: 'قيد المراجعة', submittedAt: new Date()
  });

  return res.json({ message: 'تم تقديم الطلب بنجاح', applicationId: appId });
});

// ✅ /upload-docs – رفع مستندات
router.post('/upload-docs', (req, res) => {
  const { applicationId, type, fileData } = req.body;

  if (!applicationId || !type || !fileData) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!documents[applicationId]) documents[applicationId] = [];
  documents[applicationId].push({ type, fileData, uploadedAt: new Date() });

  return res.json({ message: 'تم رفع المستند بنجاح' });
});

// ✅ /track-status – تتبع الطلب
router.get('/track-status', (req, res) => {
  const { applicationId, email } = req.query;

  let app = applicationId
    ? applications.find(a => a.id === applicationId)
    : applications.find(a => a.email === email);

  if (!app) return res.status(404).json({ error: 'لم يتم العثور على الطلب' });

  return res.json({
    status: app.status,
    submittedAt: app.submittedAt,
    applicationId: app.id
  });
});

module.exports = router;
// ✅ عرض جميع الطلبات – GET /applications
router.get('/admin/applications', (req, res) => {
  res.json(applications); // متغير التطبيقات الموجود مسبقًا في الذاكرة
});
