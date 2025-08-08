const fs = require('fs');
const path = require('path');
const csv = fs.readFileSync(path.join(__dirname, '..', 'audit', 'audit_log_template.csv'), 'utf8').trim().split('\n').slice(1);

const summary = {};
for (const line of csv) {
  const [timestamp,,action,,] = line.split(/,(.+)/)[0].split(',');
  const week = timestamp.slice(0,10);
  summary[week] = (summary[week] || 0) + 1;
}
console.log('week,evaluations');
for (const week of Object.keys(summary)) {
  console.log(`${week},${summary[week]}`);
}
