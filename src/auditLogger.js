const fs = require('fs');
const path = require('path');

const auditPath = path.join(__dirname, '..', 'audit', 'audit_log_template.csv');

function logEvaluation(nationalId, payload) {
  const line = `${new Date().toISOString()},API,Evaluate,${nationalId},"${JSON.stringify(payload).replace(/"/g, '""')}"\n`;
  fs.appendFileSync(auditPath, line, 'utf8');
}

module.exports = { logEvaluation };
