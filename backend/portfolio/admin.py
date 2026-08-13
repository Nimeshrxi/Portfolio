"""Admin configuration for portfolio content management."""
from django.contrib import admin

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


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1
    fields = ("image", "caption", "order")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "category",
        "status",
        "is_featured",
        "order",
        "completion_date",
        "updated_at",
    )
    list_filter = ("category", "status", "is_featured")
    list_editable = ("is_featured", "order", "status")
    search_fields = ("title", "short_description", "description", "tech_stack")
    prepopulated_fields = {"slug": ("title",)}
    inlines = [ProjectImageInline]
    fieldsets = (
        (
            "Mission file",
            {
                "fields": (
                    "title",
                    "slug",
                    "category",
                    "status",
                    "is_featured",
                    "order",
                    "completion_date",
                )
            },
        ),
        (
            "Story",
            {
                "fields": (
                    "short_description",
                    "description",
                    "problem",
                    "solution",
                    "features",
                    "architecture",
                    "database",
                    "challenges",
                    "learning",
                )
            },
        ),
        (
            "Links and media",
            {"fields": ("tech_stack", "github_url", "live_url", "featured_image")},
        ),
    )


class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1
    fields = ("name", "proficiency", "icon", "spider_sense_highlight", "order")


@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "order")
    list_editable = ("order",)
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name",)
    inlines = [SkillInline]


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "category",
        "proficiency",
        "spider_sense_highlight",
        "order",
    )
    list_filter = ("category", "spider_sense_highlight")
    list_editable = ("proficiency", "spider_sense_highlight", "order")
    search_fields = ("name",)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("name", "title", "email", "location", "is_active", "updated_at")
    list_filter = ("is_active",)
    search_fields = ("name", "title", "email", "bio")


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("role", "company", "start_date", "end_date", "is_current", "order")
    list_filter = ("is_current",)
    list_editable = ("order",)
    search_fields = ("role", "company", "description", "technologies")


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("degree", "institution", "field", "start_date", "end_date", "order")
    list_editable = ("order",)
    search_fields = ("degree", "institution", "field", "description")


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "year", "order")
    list_filter = ("category", "year")
    list_editable = ("order",)
    search_fields = ("title", "category", "description")


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ("platform", "url", "is_active", "order")
    list_filter = ("is_active",)
    list_editable = ("is_active", "order")
    search_fields = ("platform", "url")


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ("title", "is_active", "uploaded_at", "updated_at")
    list_filter = ("is_active",)
    search_fields = ("title",)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "is_read", "created_at")
    list_filter = ("is_read", "created_at")
    list_editable = ("is_read",)
    search_fields = ("name", "email", "subject", "message")
    readonly_fields = ("name", "email", "subject", "message", "created_at")


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ("site_name", "tagline", "contact_email", "is_active", "updated_at")
    list_filter = ("enable_spider_sense", "enable_easter_eggs", "is_active")
    search_fields = ("site_name", "tagline", "meta_description", "contact_email")
