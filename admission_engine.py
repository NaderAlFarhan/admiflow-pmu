from __future__ import annotations

"""High-level admission engine integrating eligibility, document verification, and decision email sending.

This module builds upon :class:`EligibilityEngine` and introduces placeholders that
prepare the system for future API wrapping and integration with document verification
and decision email generation services.
"""

from dataclasses import dataclass
from typing import Dict, Any

from EligibilityEngine import EligibilityEngine, EligibilityResult


@dataclass
class ApplicationData:
    """Container for application scores."""

    gpa: float
    qudrat: float
    tahseely: float
    ielts: float


class AdmissionEngine:
    """Coordinate full admission workflow."""

    def __init__(self, eligibility_engine: EligibilityEngine | None = None) -> None:
        # محرك الأهلية الأساسي | Underlying eligibility engine
        self.eligibility_engine = eligibility_engine or EligibilityEngine()

    def verify_documents(self, documents: Dict[str, Any]) -> bool:
        """Verify provided documents.

        التحقق من اكتمال المستندات – Return ``True`` if every required document has data.
        """
        # التحقق من المستندات المقدمة | Validate supplied documents
        return all(bool(data) for data in documents.values())

    def send_decision_email(self, email: str, result: EligibilityResult) -> None:
        """Send admission decision via email.

        إرسال قرار القبول عبر البريد الإلكتروني – Placeholder for future integration with
        decision email generator service.
        """
        # إرسال بريد القرار | Send decision email
        print(f"Sending decision to {email}: eligible={result.eligible}, track={result.track}")

    def process_application(self, application: ApplicationData, documents: Dict[str, Any], email: str) -> EligibilityResult:
        """Process full application flow.

        معالجة طلب القبول بالكامل – Verifies documents, evaluates eligibility, then sends
        decision email. Designed for future API wrapping.
        """
        # خطوة 1: التحقق من المستندات | Step 1: verify documents
        if not self.verify_documents(documents):
            return EligibilityResult(False, None)

        # خطوة 2: تقييم الأهلية | Step 2: evaluate eligibility
        result = self.eligibility_engine.check(
            application.gpa,
            application.qudrat,
            application.tahseely,
            application.ielts,
        )

        # خطوة 3: إرسال القرار | Step 3: send decision email
        self.send_decision_email(email, result)

        return result
