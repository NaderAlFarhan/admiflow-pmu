document.getElementById('admissionForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  const payload = {};
  form.forEach((val, key) => payload[key] = val);

  const res = await fetch('/evaluate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const result = await res.json();
  alert("Decision: " + result.status + "\n" + result.recommendation);
});
