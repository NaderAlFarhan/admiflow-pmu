from scripts.eligibility_engine import evaluate_eligibility


def test_all_criteria_met():
    scores = {
        "high_school_score": 90,
        "qudrat_score": 70,
        "tahseely_score": 70,
        "ielts_overall": 6.5,
        "ielts_writing": 6.0,
    }
    result = evaluate_eligibility(scores)
    assert result["Status"] == "Qualified"
    assert result["MissingCriteria"] == []


def test_missing_criteria():
    scores = {
        "high_school_score": 80,
        "qudrat_score": 60,
        "tahseely_score": 70,
        "ielts_overall": 5.5,
        "ielts_writing": 5.0,
    }
    result = evaluate_eligibility(scores)
    assert result["Status"] == "Not Qualified"
    assert "High School Score ≥ 85%" in result["MissingCriteria"]
    assert "Qudurat Score ≥ 65" in result["MissingCriteria"]
    assert "IELTS Overall ≥ 6.0" in result["MissingCriteria"]
    assert "IELTS Writing ≥ 5.5" in result["MissingCriteria"]
    assert len(result["MissingCriteria"]) == 4
