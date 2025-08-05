const assert = require('assert');
const { generateEmailContent } = require('../email_templates');

// Test acceptance
const accept = generateEmailContent({
  type: 'accept',
  fields: { applicantName: 'Sara', program: 'Engineering', deadline: '1 Sept 2025' }
});
assert(accept.subject_en.includes('Engineering'));
assert(accept.subject_ar.includes('Engineering'));
assert(accept.body_en.includes('Sara'));
assert(accept.html_ar.includes('يرجى تأكيد القبول'));

// Test missing documents
const missing = generateEmailContent({
  type: 'missing',
  fields: { applicantName: 'Omar', program: 'Science', missingItems: ['Passport'], deadline: '15 Aug 2025' }
});
assert(missing.body_en.includes('Passport'));
assert(missing.body_ar.includes('15 Aug 2025'));

// Test rejection with alternatives
const reject = generateEmailContent({
  type: 'reject',
  fields: { applicantName: 'Lina', program: 'Math', alternatives: ['Physics'], deadline: 'N/A' }
});
assert(reject.body_en.includes('Physics'));
assert(reject.body_ar.includes('Math'));

console.log('All tests passed.');
