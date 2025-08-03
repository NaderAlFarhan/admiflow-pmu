import argparse
import json
import os
from pathlib import Path

import openai

DEFAULT_CONTEXT = "PromptMaster_AdmiFlowPMU_v2025Q.json"


def load_messages(context_path: Path) -> list:
    try:
        data = json.loads(context_path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        return []

    messages = []
    system_prompt = data.get("system_prompt")
    if system_prompt:
        messages.append({"role": "system", "content": system_prompt})
    return messages


def run_cli(prompt: str, context: str) -> str:
    messages = load_messages(Path(context))
    messages.append({"role": "user", "content": prompt})
    client = openai.OpenAI(api_key=os.environ["OPENAI_API_KEY"])
    resp = client.chat.completions.create(model="gpt-4o-mini", messages=messages)
    return resp.choices[0].message.content.strip()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="AdmiFlow – PMU prompt CLI")
    parser.add_argument("prompt", help="Question to send to the model")
    parser.add_argument(
        "--context",
        default=DEFAULT_CONTEXT,
        help="Path to context JSON file",
    )
    return parser.parse_args()


def main() -> None:
    if "OPENAI_API_KEY" not in os.environ:
        raise SystemExit("OPENAI_API_KEY environment variable is not set")
    args = parse_args()
    print(run_cli(args.prompt, args.context))


if __name__ == "__main__":
    main()
