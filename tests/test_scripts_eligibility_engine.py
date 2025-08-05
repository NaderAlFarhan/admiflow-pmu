from scripts.eligibility_engine import evaluate_eligibility


def test_engineering_qualified():
    applicant = {
        "program": "Engineering",
        "high_school": 90,
        "qudrat": 70,
        "tahseely": 70,
        "ielts": 6.5,
    }
    result = evaluate_eligibility(applicant)
    assert result["Status"] == "Qualified"
    assert result["MissingCriteria"] == []
    assert result["SuggestedPrograms"] == []


def test_missing_criteria_with_alternative():
    applicant = {
        "program": "Engineering",
        "high_school": 80,
        "qudrat": 65,
        "tahseely": 60,
        "ielts": 6.0,
    }
    result = evaluate_eligibility(applicant)
    assert result["Status"] == "Not Qualified"
    assert "High School % ≥ 85" in result["MissingCriteria"]
    assert "Tahseely Score ≥ 65" in result["MissingCriteria"]
    assert "Business" in result["SuggestedPrograms"]


def test_not_qualified_any_program():
    applicant = {
        "program": "Engineering",
        "high_school": 70,
        "qudrat": 50,
        "tahseely": 40,
        "ielts": 5.0,
    }
    result = evaluate_eligibility(applicant)
    assert result["Status"] == "Not Qualified"
    assert result["SuggestedPrograms"] == []
