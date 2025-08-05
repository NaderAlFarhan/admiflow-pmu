const evaluate = require('../src/eligibility');

test('Engineering student passes', () => {
  expect(evaluate({ highSchoolScore: 90, qudurat: 70, tahsili: 75, ielts: 6 }))
    .toEqual({ status: "Accepted", recommendation: "Engineering Tracks Available" });
});

test('Non-engineering conditional', () => {
  expect(evaluate({ highSchoolScore: 81, qudurat: 60, tahsili: 60, ielts: 6 }))
    .toEqual({ status: "Conditionally Accepted", recommendation: "Non-Engineering Eligible" });
});

test('Rejected case', () => {
  expect(evaluate({ highSchoolScore: 70, qudurat: 50, tahsili: 50, ielts: 4 }))
    .toEqual({ status: "Rejected", recommendation: "Does not meet requirements." });
});
