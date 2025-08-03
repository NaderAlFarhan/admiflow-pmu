import json
import os
from pathlib import Path
import argparse

import openai
import streamlit as st

import sharepoint_upload


DEFAULT_CONTEXT = "PromptMaster_AdmiFlowPMU_v2025Q.json"
DEFAULT_TRIGGER = "NADER_PMU_Intelligent_Trigger.txt"


def load_context(path: Path) -> dict:
    try:
        with path.open(encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return {}


def main(initial_context: str = DEFAULT_CONTEXT, trigger_path: str = DEFAULT_TRIGGER):
    st.title("AdmiFlow – PMU")

    # Display trigger text if requested
    if st.checkbox("Show Codex trigger"):
        trigger_text = Path(trigger_path).read_text(encoding="utf-8")
        st.text(trigger_text)

    # Allow users to provide a context file via uploader or path
    uploaded = st.file_uploader("Upload context JSON", type="json")
    context_path = st.text_input("Context path", initial_context)

    if uploaded is not None:
        context = json.load(uploaded)
    else:
        context = load_context(Path(context_path))

    prompt = st.text_area("Enter prompt")
    upload_to_sp = st.checkbox("Upload result to SharePoint")
    if st.button("Run") and prompt:
        messages = []
        system_prompt = context.get("system_prompt", "")
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        with st.spinner("Generating response..."):
            response = openai.ChatCompletion.create(
                model="gpt-4o-mini",
                messages=messages,
            )
        result = response.choices[0].message["content"].strip()
        st.write(result)

        if upload_to_sp:
            tmp = Path("codex_result.txt")
            tmp.write_text(result, encoding="utf-8")
            token = os.environ.get("GRAPH_ACCESS_TOKEN")
            site_id = os.environ.get("SHAREPOINT_SITE_ID")
            drive_id = os.environ.get("SHAREPOINT_DRIVE_ID")
            if token and site_id and drive_id:
                with st.spinner("Uploading to SharePoint..."):
                    info = sharepoint_upload.upload_file(tmp, token, site_id, drive_id)
                st.success(f"Uploaded {info.get('name')} to SharePoint")
            else:
                st.warning("SharePoint environment variables not set; skipping upload.")
            tmp.unlink(missing_ok=True)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run AdmiFlow prompt interface")
    parser.add_argument(
        "--context",
        default=DEFAULT_CONTEXT,
        help="Path to context JSON file",
    )
    parser.add_argument(
        "--trigger",
        default=DEFAULT_TRIGGER,
        help="Path to Codex trigger text",
    )
    return parser.parse_args()


if __name__ == "__main__":
    if "OPENAI_API_KEY" not in os.environ:
        st.error("OPENAI_API_KEY environment variable is not set.")
    else:
        openai.api_key = os.environ["OPENAI_API_KEY"]
        args = parse_args()
        main(args.context, args.trigger)
