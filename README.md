# 📘 AdmiFlow – PMU | Smart Admissions Core System

AdmiFlow – PMU is a smart, bilingual admissions platform for Prince Mohammad Bin Fahd University. It combines GitHub automation, Codex triggers, SharePoint workflows, and a Streamlit interface to deliver an end‑to‑end admissions experience.

---

## 🌐 Live Preview

- **GitHub Pages:** https://naderalfarhan.github.io/admiflow-pmu/
- **Render Deployment:** https://admiflow-pmu.onrender.com

---

## ✨ Features

- 🧠 Codex integration for intelligent prompt execution
- 📑 SharePoint workflow with Power Automate notifications
- 🖥️ Streamlit UI for interactive admission queries
- 🔁 GitHub Actions for automatic builds and deployments
- 🌍 Dual language (Arabic / English) support

---

## 🚀 Quick Start

```bash
# install dependencies
pip install openai streamlit

# set your OpenAI key
export OPENAI_API_KEY="sk-..."

# run the Streamlit interface
streamlit run run_prompt.py -- --context PromptMaster_AdmiFlowPMU_v2025Q.json
```

The `PromptMaster_AdmiFlowPMU_v2025Q.json` file provides system instructions and sample interactions. The app can also be deployed via the included GitHub Pages workflow (`gh-pages.yml`).

---

## 📁 Repository Structure

```bash
.
├── app.py                     # Streamlit web interface
├── EligibilityCalculator.json  # Admission criteria rules
├── EligibilityEngine.py        # Python eligibility evaluator
├── run_prompt.py              # CLI/Streamlit runner
├── main.py                    # CLI prompt helper
├── sharepoint_upload.py       # SharePoint integration helper
├── PromptMaster_AdmiFlowPMU_v2025Q.json
├── instructions.md            # Usage documentation
└── .github/workflows/
    ├── codex-notify.yml       # Notify Codex + Power Automate
    └── gh-pages.yml           # Deploy to GitHub Pages
```

---

## 🧠 Maintainer

**Nader Al Farhan**  
Administrative Assistant – Admissions Unit  
📧 nalfarhan@pmu.edu.sa  
🔗 [LinkedIn](https://www.linkedin.com/in/naderalfarhan)

---

## 📄 License

[MIT License](LICENSE) – for educational and internal institutional use only.


## 🛠 Node API

### Run
```bash
npm install
npm start
```

### Test
```bash
npm test
```

### Deploy (Docker)
```bash
docker build -t admiflow-api .
docker run -p 3000:3000 admiflow-api
```

### Tenant Binding
- Provision SharePoint lists using `scripts/provision-sharepoint.ps1`.
- Import `flows/admissions_flow_skeleton.json` and bind SharePoint/Outlook connections.
- Use email templates in the `emails/` directory for notifications.
