# 📘 AdmiFlow – PMU | تشغيل النظام وتوثيق التعليمات

## 🛠️ المتطلبات
- Python 3.10+
- مكتبة OpenAI
- مكتبة Streamlit
- ملف JSON للسياق: `PromptMaster_AdmiFlowPMU_v2025Q.json`
- (اختياري) مكتبة Requests لتكامل SharePoint

## ⚙️ إعداد البيئة
```bash
pip install openai streamlit
```

عيّن مفتاح واجهة OpenAI البرمجية:
```bash
export OPENAI_API_KEY=your_key_here  # على macOS/Linux
# أو على Windows
set OPENAI_API_KEY=your_key_here
```

## 🚀 تشغيل الواجهة التفاعلية
بعد تهيئة البيئة والمتغيرات، شغّل واجهة Streamlit:
```bash
streamlit run app.py
```
يفتح التطبيق في المتصفح المحلي على العنوان الذي يعرضه Streamlit.

## 📥 تحميل ملف الإدخال
داخل الواجهة، استخدم أداة رفع الملفات لاختيار ملف السياق `PromptMaster_AdmiFlowPMU_v2025Q.json`.
يمكن تمرير ملف السياق مباشرة عند تشغيل التطبيق:
```bash
streamlit run app.py -- --context PromptMaster_AdmiFlowPMU_v2025Q.json
```

لإظهار نص التريغر الجاهز `NADER_PMU_Intelligent_Trigger.txt` فعل خيار **Show Codex trigger** داخل الواجهة.

## 🧪 إرسال الطلبات التجريبية
1. أدخل سؤال القبول أو الطلب المطلوب في حقل الإدخال.
2. اضغط زر **تشغيل** لإرسال الطلب إلى النموذج الذكي.
3. يتم استخدام ملف JSON لتوفير سياق القبول الجامعي وتحسين الاستجابة.

## 📊 عرض النتائج والتفاعل معها
- تظهر الاستجابة في واجهة Streamlit مع توصيات أو قرارات قبول.
- يمكنك تعديل الطلب وإعادة الإرسال للحصول على نتائج مختلفة.
- للحفاظ على سجل الاستخدام، يمكنك اختيار **Upload result to SharePoint** لإرسال المخرجات تلقائيًا عبر Microsoft Graph.
- يتطلب ذلك ضبط المتغيرات التالية:
  ```bash
  export GRAPH_ACCESS_TOKEN=your_token
  export SHAREPOINT_SITE_ID=your_site_id
  export SHAREPOINT_DRIVE_ID=your_drive_id
  ```

> تم إعداد هذا الدليل لتسهيل التشغيل السريع للنظام الذكي «AdmiFlow – PMU» في بيئة محلية.

## 🗂️ تكامل SharePoint (اختياري)
يتيح الملف `sharepoint_upload.py` رفع الملفات إلى مكتبة SharePoint عبر Microsoft Graph:
```bash
pip install requests
export GRAPH_ACCESS_TOKEN=your_token
export SHAREPOINT_SITE_ID=your_site_id
export SHAREPOINT_DRIVE_ID=your_drive_id
python sharepoint_upload.py PromptMaster_AdmiFlowPMU_v2025Q.json
```
يجب توفير بيانات الاعتماد اللازمة مسبقًا، ويحفظ السكربت الملف في المجلد الجذر للمكتبة المحددة.

لمزيد من التفاصيل حول حقول SharePoint استخدم [sharepoint_data_model.md](sharepoint_data_model.md).

## 🧮 تشغيل سطر الأوامر
يمكن إرسال طلب واحد مباشرة من سطر الأوامر عبر:
```bash
python main.py "أدخل سؤالك هنا" --context PromptMaster_AdmiFlowPMU_v2025Q.json
```
يعرض السكربت الاستجابة النصية في الطرفية.

## 🔁 Power Automate
يوفر الملف `power_automate_flow.json` مخططًا مبسطًا لتدفق يقوم بإرسال بيانات الطلب عبر طلب HTTP إلى خدمة «AdmiFlow».

يتم إرسال إشعارات دمج الفرع الرئيسي تلقائيًا إلى Codex وPower Automate عبر ملف GitHub Actions الجديد `.github/workflows/codex-notify.yml`.

## 🌍 GitHub Pages
- الصفحة التعريفية متاحة عبر GitHub Pages على الرابط:
  [https://naderalfarhan.github.io/admiFlow-pmu/](https://naderalfarhan.github.io/admiFlow-pmu/)
- يتم النشر التلقائي عبر ملف GitHub Actions: `.github/workflows/gh-pages.yml`

## 🧠 تريغر NADER Supreme Execution
- يحتوي الملف `NADER_PMU_Intelligent_Trigger.txt` على نص جاهز للتفعيل الكامل مع Codex.
- يمكن نسخ النص كما هو لإطلاق التنفيذ الذكي داخل أنظمة إدارة المهام أو التوثيق.

