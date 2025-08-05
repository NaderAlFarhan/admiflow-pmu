import os
import sys
from pathlib import Path
import requests


def upload_file(file_path: Path, token: str, site_id: str, drive_id: str) -> dict:
    with file_path.open("rb") as f:
        url = (
            f"https://graph.microsoft.com/v1.0/sites/{site_id}/drives/{drive_id}/root:/"
            f"{file_path.name}:/content"
        )
        headers = {"Authorization": f"Bearer {token}"}
        resp = requests.put(url, headers=headers, data=f)
    resp.raise_for_status()
    return resp.json()


def main(argv: list[str]) -> None:
    if len(argv) != 2:
        print("Usage: python sharepoint_upload.py <file_path>")
        sys.exit(1)
    file_path = Path(argv[1]).expanduser()
    token = os.environ["GRAPH_ACCESS_TOKEN"]
    site_id = os.environ["SHAREPOINT_SITE_ID"]
    drive_id = os.environ["SHAREPOINT_DRIVE_ID"]
    info = upload_file(file_path, token, site_id, drive_id)
    print(f"Uploaded {info.get('name')} to SharePoint")


if __name__ == "__main__":
    main(sys.argv)
