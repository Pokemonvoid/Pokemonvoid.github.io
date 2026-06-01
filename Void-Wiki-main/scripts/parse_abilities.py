#!/usr/bin/env python3

import argparse
import json
import re
from pathlib import Path


FIELD_MAP = {
    "Name": "name",
    "Description": "desc",
}

REQUIRED_FIELDS = ("name", "desc")
OUTPUT_FIELDS = ("name", "desc")


def finish_ability(abilities, current_id, current_ability):
    if current_ability is None:
        return

    missing = [field for field in REQUIRED_FIELDS if field not in current_ability]
    if missing:
        raise ValueError(f"[{current_id}] is missing required field(s): {', '.join(missing)}")

    abilities.append({field: current_ability[field] for field in OUTPUT_FIELDS})


def parse_abilities(text):
    abilities = []
    current_id = None
    current_ability = None

    for line_number, raw_line in enumerate(text.splitlines(), start=1):
        line = raw_line.strip()

        if not line or line.startswith("#"):
            continue

        section_match = re.fullmatch(r"\[([^\]]+)\]", line)
        if section_match:
            finish_ability(abilities, current_id, current_ability)
            current_id = section_match.group(1)
            current_ability = {}
            continue

        if current_ability is None:
            continue

        key_value_match = re.fullmatch(r"([^=]+?)\s*=\s*(.*)", line)
        if not key_value_match:
            raise ValueError(f"Could not parse line {line_number}: {raw_line}")

        key = key_value_match.group(1).strip()
        value = key_value_match.group(2).strip()
        output_key = FIELD_MAP.get(key)

        if output_key is None:
            continue

        current_ability[output_key] = value

    finish_ability(abilities, current_id, current_ability)
    return abilities


def main():
    parser = argparse.ArgumentParser(
        description="Convert a Pokemon Essentials-style abilities text file to wiki ability JSON."
    )
    parser.add_argument("input", type=Path, help="Path to the abilities text file.")
    parser.add_argument(
        "output",
        type=Path,
        nargs="?",
        default=Path("abilities.json"),
        help="Path to write the JSON file. Defaults to abilities.json.",
    )
    args = parser.parse_args()

    abilities = parse_abilities(args.input.read_text(encoding="utf-8"))
    args.output.write_text(
        json.dumps(abilities, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    print(f"Wrote {len(abilities)} abilities to {args.output}")


if __name__ == "__main__":
    main()
