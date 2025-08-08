const express = require('express');
const { evalApplicant } = require('./eligibilityEngine');
const { logEvaluation } = require('./auditLogger');

const app = express();
app.use(express.json());

app.post('/evaluate', (req, res) => {
  try {
    const result = evalApplicant(req.body);
    logEvaluation(req.body.national_id || '', req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/batch-evaluate', (req, res) => {
  const applicants = req.body.applicants;
  if (!Array.isArray(applicants)) {
    return res.status(400).json({ error: 'applicants must be an array' });
  }
  const results = applicants.map(a => {
    try {
      const r = evalApplicant(a);
      logEvaluation(a.national_id || '', a);
      return r;
    } catch (e) {
      return { error: e.message };
    }
  });
  res.json({ results });
});

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
