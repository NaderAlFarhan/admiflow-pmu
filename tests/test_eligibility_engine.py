import sys
from pathlib import Path

# Ensure repo root in path
sys.path.append(str(Path(__file__).resolve().parents[1]))

from EligibilityEngine import check_eligibility, EligibilityEngine, EligibilityResult


def test_engineering_eligible():
    result = check_eligibility(gpa=90, qudrat=70, tahseely=70, ielts=6.5)
    assert result == EligibilityResult(True, "engineering")


def test_non_engineering_eligible():
    engine = EligibilityEngine()
    res = engine.check(gpa=82, qudrat=61, tahseely=62, ielts=6.0)
    assert res.eligible and res.track == "non_engineering"


def test_not_eligible():
    res = check_eligibility(gpa=70, qudrat=50, tahseely=50, ielts=5.0)
    assert res == EligibilityResult(False, None)
