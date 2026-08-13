"""Serializers for the public portfolio API and admin writes."""
from rest_framework import serializers

from .models import (
    Achievement,
    ContactMessage,
    Education,
    Experience,
    Profile,
    Project,
    ProjectImage,
    Resume,
    SiteSettings,
    Skill,
    SkillCategory,
    SocialLink,
)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ("id", "image", "caption", "order")


class ProjectSerializer(serializers.ModelSerializer):
    images = ProjectImageSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at", "slug")


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = (
            "id",
            "category",
            "name",
            "proficiency",
            "icon",
            "order",
            "spider_sense_highlight",
        )


class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = SkillCategory
        fields = ("id", "name", "slug", "order", "skills")
        read_only_fields = ("id", "slug")


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = "__all__"
        read_only_fields = ("id",)


class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ("id", "name", "email", "subject", "message", "is_read", "created_at")
        read_only_fields = ("id", "is_read", "created_at")


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = "__all__"
        read_only_fields = ("id",)
