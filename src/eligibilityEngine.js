const fs = require('fs');
const path = require('path');

const rulesPath = path.join(__dirname, '..', 'rules', 'eligibility_rules.json');
const rules = JSON.parse(fs.readFileSync(rulesPath, 'utf8'));

function evalApplicant(applicant) {
  const programRules = rules.criteria[applicant.program_type];
  if (!programRules) {
    throw new Error(`Unknown program type: ${applicant.program_type}`);
  }

  const missing = [];
  const requiredDocs = rules.documents_required;
  if (Array.isArray(requiredDocs)) {
    for (const doc of requiredDocs) {
      if (!applicant.documents || !applicant.documents.includes(doc)) {
        missing.push(doc);
      }
    }
  }

  const meetsHS = applicant.hs_percent >= programRules.hs_percent_min;
  const meetsQT = applicant.qiyas_qt >= programRules.qiyas_qt_min;
  const meetsSA = applicant.qiyas_sa >= programRules.qiyas_sa_min;
  const meetsEN =
    applicant.ielts_overall >= programRules.ielts_overall_min &&
    applicant.ielts_writing >= programRules.ielts_writing_min;

  const eligible = meetsHS && meetsQT && meetsSA && meetsEN && missing.length === 0;

  const score = Math.round(
    (
      (applicant.hs_percent / 100) * 40 +
      (applicant.qiyas_qt / 100) * 20 +
      (applicant.qiyas_sa / 100) * 20 +
      (Math.min(applicant.ielts_overall, 9) / 9) * 20
    ) * 100
  ) / 100;

  const recommended = [];
  if (eligible && applicant.program_type === 'Engineering') {
    recommended.push('Engineering Tracks');
  }
  if (eligible && applicant.program_type === 'NonEngineering') {
    recommended.push('Business/CS/Other');
  }

  const notes = [];
  if (missing.length) {
    notes.push('Missing documents block enrollment; email PDF copies.');
  }

  return {
    eligible,
    score,
    missing_documents: missing,
    recommended_programs: recommended,
    notes
  };
}

module.exports = { evalApplicant };
