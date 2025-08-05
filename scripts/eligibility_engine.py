"""Program-based eligibility evaluation.

This module loads admission rules from a JSON file and evaluates whether an
applicant qualifies for a requested program.  If the applicant does not meet
the minimum requirements, a list of missing criteria and suggested alternative
programs is returned.

الموديول يحمّل قواعد القبول من ملف JSON ويقيّم أهلية المتقدم للبرنامج
المطلوب. في حال عدم استيفاء الشروط، يتم إرجاع قائمة بالمعايير الناقصة
والبرامج البديلة المقترحة.
"""

from __future__ import annotations

from pathlib import Path
from typing import Dict, List, Any
import json


# Path to JSON rules located alongside this module
RULES_PATH = Path(__file__).with_name("program_rules.json")


# Human‑readable labels for criteria
LABELS = {
    "high_school": "High School % ≥ {value}",
    "qudrat": "Qudurat Score ≥ {value}",
    "tahseely": "Tahseely Score ≥ {value}",
    "ielts": "IELTS ≥ {value}",
}


def evaluate_eligibility(applicant: Dict[str, float] | str) -> Dict[str, Any]:
    """Return eligibility status, missing criteria and alternatives.

    Parameters
    ----------
    applicant:
        Either a mapping of applicant data or a JSON string containing:
        ``program`` (requested program name) and the scores ``high_school``,
        ``qudrat``, ``tahseely`` and ``ielts``.

    Returns
    -------
    dict
        JSON‑serialisable result with keys ``Status``, ``MissingCriteria`` and
        ``SuggestedPrograms``.
    """

    # Allow passing JSON string
    if isinstance(applicant, str):
        applicant = json.loads(applicant)

    program = applicant.get("program")
    if not program:
        raise ValueError("Applicant data must include 'program'")

    with RULES_PATH.open(encoding="utf-8") as f:
        rules: Dict[str, Dict[str, float]] = json.load(f)

    if program not in rules:
        raise ValueError(f"Unknown program: {program}")

    program_rules = rules[program]

    missing: List[str] = []
    for key, minimum in program_rules.items():
        value = float(applicant.get(key, 0))
        if value < minimum:
            label_tpl = LABELS.get(key, f"{key} ≥ {{value}}")
            missing.append(label_tpl.format(value=minimum))

    status = "Qualified" if not missing else "Not Qualified"

    suggestions: List[str] = []
    if status == "Not Qualified":
        for alt_program, criteria in rules.items():
            if alt_program == program:
                continue
            if all(float(applicant.get(k, 0)) >= v for k, v in criteria.items()):
                suggestions.append(alt_program)

    return {
        "Status": status,
        "MissingCriteria": missing,
        "SuggestedPrograms": suggestions,
    }


__all__ = ["evaluate_eligibility"]

