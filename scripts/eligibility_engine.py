"""Eligibility evaluation for AdmiFlow-PMU.
تقييم الأهلية لنظام AdmiFlow-PMU"""

from typing import Dict, List

# Eligibility rules definition (English + Arabic)
# تعريف قواعد الأهلية
CRITERIA = [
    ("High School Score ≥ 85%", "high_school_score", 85),
    ("Qudurat Score ≥ 65", "qudrat_score", 65),
    ("Tahseely Score ≥ 65", "tahseely_score", 65),
    ("IELTS Overall ≥ 6.0", "ielts_overall", 6.0),
    ("IELTS Writing ≥ 5.5", "ielts_writing", 5.5),
]


def evaluate_eligibility(scores: Dict[str, float]) -> Dict[str, object]:
    """Return eligibility status and missing criteria.

    Parameters:
        scores: mapping of score name to value
        Dictionary example: {
            "high_school_score": 90,
            "qudrat_score": 70,
            "tahseely_score": 70,
            "ielts_overall": 6.5,
            "ielts_writing": 6.0,
        }

    Returns:
        dict ready for JSON serialization
    """
    # Collect unmet rules
    # جمع الشروط غير المستوفاة
    missing: List[str] = []
    for label, key, minimum in CRITERIA:
        # Retrieve student's score; default to 0 if missing
        # جلب درجة الطالب؛ القيمة الافتراضية 0 في حال عدم توفرها
        value = scores.get(key, 0)
        if value < minimum:
            missing.append(label)

    # Determine final status based on missing criteria
    # تحديد الحالة النهائية بناءً على الشروط الناقصة
    status = "Qualified" if not missing else "Not Qualified"

    # Return JSON-ready result
    # إرجاع النتيجة بصيغة جاهزة لـ JSON
    return {"Status": status, "MissingCriteria": missing}
