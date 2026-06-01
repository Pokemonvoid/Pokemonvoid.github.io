#!/usr/bin/env python3

import argparse
import json
import re
from pathlib import Path


DASH = "\u2014"

FIELD_MAP = {
    "Name": "name",
    "Type": "type",
    "Category": "cls",
    "Power": "pow",
    "Accuracy": "acc",
    "TotalPP": "pp",
    "Description": "desc",
}

REQUIRED_FIELDS = ("name", "type", "cls", "pp", "desc")
OUTPUT_FIELDS = ("name", "type", "cls", "pow", "acc", "pp", "desc")
DEFAULT_FIELDS = {
    "pow": DASH,
    "acc": DASH,
}


def number_or_dash(value, field_name):
    try:
        number = int(value)
    except ValueError as exc:
        raise ValueError(f"{field_name} must be a number, got {value!r}") from exc

    return DASH if number == 0 else number


def normalize_value(key, value):
    if key in ("Power", "Accuracy"):
        return number_or_dash(value, key)

    if key == "TotalPP":
        try:
            return int(value)
        except ValueError as exc:
            raise ValueError(f"TotalPP must be a number, got {value!r}") from exc

    return value


def finish_move(moves, current_id, current_move):
    if current_move is None:
        return

    for field, default in DEFAULT_FIELDS.items():
        current_move.setdefault(field, default)

    missing = [field for field in REQUIRED_FIELDS if field not in current_move]
    if missing:
        raise ValueError(f"[{current_id}] is missing required field(s): {', '.join(missing)}")

    moves.append({field: current_move[field] for field in OUTPUT_FIELDS})


def parse_moves(text):
    moves = []
    current_id = None
    current_move = None

    for line_number, raw_line in enumerate(text.splitlines(), start=1):
        line = raw_line.strip()

        if not line or line.startswith("#"):
            continue

        section_match = re.fullmatch(r"\[([^\]]+)\]", line)
        if section_match:
            finish_move(moves, current_id, current_move)
            current_id = section_match.group(1)
            current_move = {}
            continue

        if current_move is None:
            continue

        key_value_match = re.fullmatch(r"([^=]+?)\s*=\s*(.*)", line)
        if not key_value_match:
            raise ValueError(f"Could not parse line {line_number}: {raw_line}")

        key = key_value_match.group(1).strip()
        value = key_value_match.group(2).strip()
        output_key = FIELD_MAP.get(key)

        if output_key is None:
            continue

        try:
            current_move[output_key] = normalize_value(key, value)
        except ValueError as exc:
            raise ValueError(f"Line {line_number}: {exc}") from exc

    finish_move(moves, current_id, current_move)
    return moves


def main():
    parser = argparse.ArgumentParser(
        description="Convert a Pokemon Essentials-style moves text file to wiki move JSON."
    )
    parser.add_argument("input", type=Path, help="Path to the moves text file.")
    parser.add_argument(
        "output",
        type=Path,
        nargs="?",
        default=Path("moves.json"),
        help="Path to write the JSON file. Defaults to moves.json.",
    )
    args = parser.parse_args()

    moves = parse_moves(args.input.read_text(encoding="utf-8"))
    args.output.write_text(json.dumps(moves, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    print(f"Wrote {len(moves)} moves to {args.output}")


if __name__ == "__main__":
    main()
