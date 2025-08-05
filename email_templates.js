'use strict';

/**
 * generateEmailContent - Create bilingual email templates for admission decisions
 * توليد قوالب بريد إلكتروني ثنائية اللغة لقرارات القبول
 *
 * @param {Object} input - Input configuration
 * @param {('missing'|'accept'|'reject')} input.type - email type
 * @param {Object} input.fields - dynamic fields { applicantName, program, missingItems, deadline, alternatives }
 * @returns {Object} object with subject/body/html in English and Arabic
 */
function generateEmailContent(input) {
  const { type, fields = {} } = input;
  // Basic dynamic fields – English & Arabic
  // حقول ديناميكية أساسية
  const name = fields.applicantName || 'Applicant';
  const program = fields.program || 'your chosen program';
  const missingItems = (fields.missingItems || []).join(', ');
  const deadline = fields.deadline || 'the specified deadline';
  const alternatives = (fields.alternatives || []).join(', ');

  let subject_en = '';
  let body_en = '';
  let html_en = '';
  let subject_ar = '';
  let body_ar = '';
  let html_ar = '';

  switch (type) {
    case 'missing':
      // Missing Documents reminder
      // تذكير بالمستندات الناقصة
      subject_en = `Missing Documents for ${program} Application`;
      body_en = `Dear ${name},\nWe noticed the following documents are missing: ${missingItems}. Please submit them by ${deadline}.`;
      html_en = `<p>Dear ${name},</p><p>We noticed the following documents are missing: ${missingItems}.</p><p>Please submit them by ${deadline}.</p>`;

      subject_ar = `مستندات ناقصة لطلب برنامج ${program}`;
      body_ar = `عزيزي/عزيزتي ${name},\nلاحظنا أن المستندات التالية ناقصة: ${missingItems}. الرجاء إرسالها قبل ${deadline}.`;
      html_ar = `<p>عزيزي/عزيزتي ${name},</p><p>لاحظنا أن المستندات التالية ناقصة: ${missingItems}.</p><p>الرجاء إرسالها قبل ${deadline}.</p>`;
      break;

    case 'accept':
      // Admission / Acceptance letter
      // خطاب قبول
      subject_en = `Admission Offer for ${program}`;
      body_en = `Dear ${name},\nCongratulations! You have been admitted to the ${program}. Please confirm by ${deadline}.`;
      html_en = `<p>Dear ${name},</p><p>Congratulations! You have been admitted to the ${program}.</p><p>Please confirm by ${deadline}.</p>`;

      subject_ar = `عرض قبول لبرنامج ${program}`;
      body_ar = `عزيزي/عزيزتي ${name},\nتهانينا! لقد تم قبولك في برنامج ${program}. يرجى تأكيد القبول قبل ${deadline}.`;
      html_ar = `<p>عزيزي/عزيزتي ${name},</p><p>تهانينا! لقد تم قبولك في برنامج ${program}.</p><p>يرجى تأكيد القبول قبل ${deadline}.</p>`;
      break;

    case 'reject':
    default:
      // Rejection with alternatives or exceptions
      // خطاب رفض مع خيارات بديلة
      subject_en = `Application Update for ${program}`;
      body_en = `Dear ${name},\nWe regret to inform you that you were not admitted to the ${program}.`;
      if (alternatives) {
        body_en += ` We encourage you to consider the following alternatives: ${alternatives}.`;
      }
      html_en = `<p>Dear ${name},</p><p>We regret to inform you that you were not admitted to the ${program}.</p>`;
      if (alternatives) {
        html_en += `<p>We encourage you to consider the following alternatives: ${alternatives}.</p>`;
      }

      subject_ar = `تحديث طلب برنامج ${program}`;
      body_ar = `عزيزي/عزيزتي ${name},\nنأسف لإبلاغك بعدم قبولك في برنامج ${program}.`;
      if (alternatives) {
        body_ar += ` نوصي بالخيارات البديلة التالية: ${alternatives}.`;
      }
      html_ar = `<p>عزيزي/عزيزتي ${name},</p><p>نأسف لإبلاغك بعدم قبولك في برنامج ${program}.</p>`;
      if (alternatives) {
        html_ar += `<p>نوصي بالخيارات البديلة التالية: ${alternatives}.</p>`;
      }
      break;
  }

  return {
    subject_en,
    body_en,
    html_en,
    subject_ar,
    body_ar,
    html_ar
  };
}

module.exports = { generateEmailContent };

/**
 * Example usage:
 * const { generateEmailContent } = require('./email_templates');
 * const email = generateEmailContent({
 *   type: 'accept',
 *   fields: { applicantName: 'Ali', program: 'Computer Science', deadline: '1 Oct 2025' }
 * });
 * console.log(email);
 */

