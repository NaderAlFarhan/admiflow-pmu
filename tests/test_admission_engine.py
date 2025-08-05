import sys
from pathlib import Path

# Ensure repo root in path
sys.path.append(str(Path(__file__).resolve().parents[1]))

from admission_engine import AdmissionEngine, ApplicationData


def test_verify_documents():
    engine = AdmissionEngine()
    assert engine.verify_documents({'id': '123', 'transcript': 'data'})
    assert not engine.verify_documents({'id': '123', 'transcript': ''})


def test_process_application(monkeypatch):
    engine = AdmissionEngine()
    app = ApplicationData(gpa=90.0, qudrat=70.0, tahseely=70.0, ielts=6.5)
    docs = {'id': '1', 'transcript': 'file'}

    captured = {}

    def fake_send(email, result):
        captured['email'] = email
        captured['result'] = result

    # استبدال وظيفة إرسال البريد | Replace the email send function
    monkeypatch.setattr(engine, 'send_decision_email', fake_send)

    result = engine.process_application(app, docs, 'user@example.com')
    assert result.eligible
    assert captured['email'] == 'user@example.com'
    assert captured['result'].eligible
