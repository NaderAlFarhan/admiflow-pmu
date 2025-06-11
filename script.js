document.getElementById("admissionForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const gpa = parseFloat(document.getElementById("gpa").value);
  const qiyas = parseFloat(document.getElementById("qiyas").value);
  const tahsili = parseFloat(document.getElementById("tahsili").value);
  const ielts = parseFloat(document.getElementById("ielts").value);
  const nationality = document.getElementById("nationality").value;

  let eligibility = "❌ غير مؤهل حاليًا";

  if (gpa >= 85 && qiyas >= 65 && tahsili >= 65 && ielts >= 6) {
    eligibility = "✅ مؤهل للتقديم في التخصصات الهندسية";
  } else if (gpa >= 80 && qiyas >= 60 && tahsili >= 60 && ielts >= 6) {
    eligibility = "✅ مؤهل للتقديم في التخصصات غير الهندسية";
  }

  document.getElementById("result").innerText = `النتيجة: ${eligibility}`;
});
