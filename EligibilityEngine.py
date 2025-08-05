"""Simple eligibility computation based on JSON-defined criteria.

This module loads eligibility rules from ``EligibilityCalculator.json`` and
provides a helper function :func:`check_eligibility` to evaluate whether a
candidate meets the requirements for engineering or non-engineering tracks.
"""
from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Optional
import json


CRITERIA_PATH = Path(__file__).with_name("EligibilityCalculator.json")


@dataclass
class EligibilityResult:
    """Result of an eligibility check."""

    eligible: bool
    track: Optional[str] = None


class EligibilityEngine:
    """Evaluate candidate data against admission criteria."""

    def __init__(self, criteria_path: Path = CRITERIA_PATH) -> None:
        with criteria_path.open(encoding="utf-8") as f:
            self.criteria: Dict[str, Dict[str, float]] = json.load(f)

    def check(self, gpa: float, qudrat: float, tahseely: float, ielts: float) -> EligibilityResult:
        """Return eligibility result for the given scores."""
        eng_rules = self.criteria.get("engineering", {})
        non_eng_rules = self.criteria.get("non_engineering", {})

        is_eng = (
            gpa >= eng_rules.get("gpa", float("inf"))
            and qudrat >= eng_rules.get("qudrat", float("inf"))
            and tahseely >= eng_rules.get("tahseely", float("inf"))
            and ielts >= eng_rules.get("ielts", float("inf"))
        )
        if is_eng:
            return EligibilityResult(True, "engineering")

        is_non_eng = (
            gpa >= non_eng_rules.get("gpa", float("inf"))
            and qudrat >= non_eng_rules.get("qudrat", float("inf"))
            and tahseely >= non_eng_rules.get("tahseely", float("inf"))
            and ielts >= non_eng_rules.get("ielts", float("inf"))
        )
        if is_non_eng:
            return EligibilityResult(True, "non_engineering")

        return EligibilityResult(False, None)


def check_eligibility(gpa: float, qudrat: float, tahseely: float, ielts: float) -> EligibilityResult:
    """Convenience wrapper around :class:`EligibilityEngine`."""
    engine = EligibilityEngine()
    return engine.check(gpa, qudrat, tahseely, ielts)
