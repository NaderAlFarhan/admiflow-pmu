import sys
from pathlib import Path
import pytest

# Ensure the repository root is in the Python path
sys.path.append(str(Path(__file__).resolve().parents[1]))

from moving_average import moving_average


def test_moving_average_basic():
    data = [1, 2, 3, 4, 5]
    assert moving_average(data, 3) == [2.0, 3.0, 4.0]


def test_window_size_one():
    data = [10, 20]
    assert moving_average(data, 1) == [10.0, 20.0]


def test_invalid_window_size():
    with pytest.raises(ValueError):
        moving_average([1, 2, 3], 0)


def test_window_larger_than_data():
    assert moving_average([1, 2], 3) == []
