const express = require('express');
const router = express.Router();

const applications = require('./application').applications;
const documents = require('./application').documents;

// ✅ تحديث حالة الطلب – PUT /admin/update-status
router.put('/admin/update-status', (req, res) => {
  const { applicationId, newStatus } = req.body;

  const app = applications.find(a => a.id === applicationId);
  if (!app) return res.status(404).json({ error: 'الطلب غير موجود' });

  app.status = newStatus;
  return res.json({ message: 'تم تحديث حالة الطلب بنجاح', applicationId });
});

// ✅ حذف طلب – DELETE /admin/delete-application
router.delete('/admin/delete-application', (req, res) => {
  const { applicationId } = req.body;

  const index = applications.findIndex(a => a.id === applicationId);
  if (index === -1) return res.status(404).json({ error: 'الطلب غير موجود' });

  applications.splice(index, 1);
  delete documents[applicationId];

  return res.json({ message: 'تم حذف الطلب وجميع مستنداته بنجاح' });
});

// ✅ عرض مستندات طلب – GET /admin/documents/:applicationId
router.get('/admin/documents/:applicationId', (req, res) => {
  const { applicationId } = req.params;

  const docs = documents[applicationId];
  if (!docs) return res.status(404).json({ error: 'لا توجد مستندات لهذا الطلب' });

  return res.json(docs);
});

module.exports = router;
