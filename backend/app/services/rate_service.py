def calculate_effective_rate(
    base_price: float,
    days_before_checkin: int
) -> float:
    if days_before_checkin > 30:
        return base_price * 0.9  # 10% discount
    if days_before_checkin < 3:
        return base_price * 1.2  # 20% surge
    return base_price
