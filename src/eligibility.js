module.exports = function evaluate(data) {
  const hs = parseFloat(data.highSchoolScore);
  const q = parseFloat(data.qudurat);
  const t = parseFloat(data.tahsili);
  const ielts = parseFloat(data.ielts);

  if (hs >= 85 && q >= 65 && t >= 65 && ielts >= 6) {
    return { status: "Accepted", recommendation: "Engineering Tracks Available" };
  } else if (hs >= 80 && q >= 60 && t >= 60 && ielts >= 6) {
    return { status: "Conditionally Accepted", recommendation: "Non-Engineering Eligible" };
  } else {
    return { status: "Rejected", recommendation: "Does not meet requirements." };
  }
};
