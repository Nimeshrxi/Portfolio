"""Custom validators for portfolio models and serializers."""
from django.core.exceptions import ValidationError


def validate_proficiency(value):
    if value is None:
        return
    if not 1 <= int(value) <= 100:
        raise ValidationError("Proficiency must be between 1 and 100.")


def validate_contact_message_length(value):
    text = (value or "").strip()
    if len(text) < 10:
        raise ValidationError("Message must be at least 10 characters.")
    if len(text) > 5000:
        raise ValidationError("Message must be at most 5000 characters.")


def validate_non_empty_name(value):
    if not (value or "").strip():
        raise ValidationError("Name cannot be empty.")
