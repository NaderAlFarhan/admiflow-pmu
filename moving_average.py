from typing import Iterable, List

def moving_average(data: Iterable[float], window_size: int) -> List[float]:
    """Compute the moving average of a sequence of numbers.

    Args:
        data: Iterable of numeric values.
        window_size: Size of the moving window. Must be a positive integer.

    Returns:
        A list of moving averages. If the data has fewer elements than the
        window size, an empty list is returned.

    Raises:
        ValueError: If ``window_size`` is not a positive integer.
    """
    if window_size <= 0:
        raise ValueError("window_size must be a positive integer")

    values = list(data)
    if len(values) < window_size:
        return []

    window_sum = sum(values[:window_size])
    averages = [window_sum / window_size]
    for i in range(window_size, len(values)):
        window_sum += values[i] - values[i - window_size]
        averages.append(window_sum / window_size)
    return averages
