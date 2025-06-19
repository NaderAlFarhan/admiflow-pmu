
const express = require('express');
const { sendEmail } = require('./sendgrid');
const { sendSMS } = require('./twilio');
const router = express.Router();

router.post('/check-eligibility', async (req, res) => {
  const { gpa, qudrat, tahseely, ielts, email, phone } = req.body;

  try {
    if (!gpa || !qudrat || !tahseely || !ielts || !email || !phone) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const isEngineeringEligible = gpa >= 85 && qudrat >= 65 && tahseely >= 65 && ielts >= 6.0;
    const isNonEngineeringEligible = gpa >= 80 && qudrat >= 60 && tahseely >= 60 && ielts >= 6.0;

    let message = '';
    if (isEngineeringEligible || isNonEngineeringEligible) {
      message = '🎓 تهانينا! تم تأهيلك مبدئيًا للقبول في جامعة الأمير محمد بن فهد.';
      await sendEmail(email, 'قبول أولي في PMU', message);
      await sendSMS(phone, message);
      return res.json({ status: 'eligible', message });
    } else {
      message = '🚫 نأسف، لم تحقق الشروط المبدئية للقبول في PMU.';
      await sendEmail(email, 'نتيجة التحقق من الأهلية', message);
      await sendSMS(phone, message);
      return res.json({ status: 'not_eligible', message });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

module.exports = router;
