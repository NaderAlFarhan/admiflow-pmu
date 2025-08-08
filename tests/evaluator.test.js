const test = require('node:test');
const assert = require('node:assert');
const { evalApplicant } = require('../src/eligibilityEngine');

test('ENG_ELIGIBLE', () => {
  const result = evalApplicant({
    national_id: '123',
    full_name: 'Test Student',
    program_type: 'Engineering',
    hs_percent: 90,
    qiyas_qt: 70,
    qiyas_sa: 70,
    ielts_overall: 7.0,
    ielts_writing: 6.0,
    documents: [
      'National ID',
      'Official High School Certificate (PDF)',
      'Qiyas QT Report (PDF)',
      'Qiyas SAAT Report (PDF)',
      'English Test (IELTS/TOEFL)'
    ]
  });
  assert.equal(result.eligible, true);
  assert.deepEqual(result.missing_documents, []);
});

test('NONENG_BORDER missing ID', () => {
  const result = evalApplicant({
    national_id: '456',
    full_name: 'Border Case',
    program_type: 'NonEngineering',
    hs_percent: 80,
    qiyas_qt: 60,
    qiyas_sa: 60,
    ielts_overall: 6.0,
    ielts_writing: 5.5,
    documents: [
      'Official High School Certificate (PDF)',
      'Qiyas QT Report (PDF)',
      'Qiyas SAAT Report (PDF)',
      'English Test (IELTS/TOEFL)'
    ]
  });
  assert.equal(result.eligible, false);
  assert.ok(result.missing_documents.includes('National ID'));
});

test('ENG_FAIL_ENGLISH', () => {
  const result = evalApplicant({
    national_id: '789',
    full_name: 'Fail English',
    program_type: 'Engineering',
    hs_percent: 90,
    qiyas_qt: 70,
    qiyas_sa: 70,
    ielts_overall: 6.5,
    ielts_writing: 5.0,
    documents: [
      'National ID',
      'Official High School Certificate (PDF)',
      'Qiyas QT Report (PDF)',
      'Qiyas SAAT Report (PDF)',
      'English Test (IELTS/TOEFL)'
    ]
  });
  assert.equal(result.eligible, false);
  assert.ok(result.notes.find(n => n.includes('Missing documents')) === undefined);
});
