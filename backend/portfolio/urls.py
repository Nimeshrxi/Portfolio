"""Portfolio API URL routing."""
from rest_framework.routers import DefaultRouter

from .views import (
    AchievementViewSet,
    ContactMessageViewSet,
    EducationViewSet,
    ExperienceViewSet,
    ProfileViewSet,
    ProjectViewSet,
    ResumeViewSet,
    SiteSettingsViewSet,
    SkillCategoryViewSet,
    SocialLinkViewSet,
)

router = DefaultRouter()
router.register("profile", ProfileViewSet, basename="profile")
router.register("projects", ProjectViewSet, basename="project")
router.register("skills", SkillCategoryViewSet, basename="skill-category")
router.register("experience", ExperienceViewSet, basename="experience")
router.register("education", EducationViewSet, basename="education")
router.register("achievements", AchievementViewSet, basename="achievement")
router.register("social-links", SocialLinkViewSet, basename="social-link")
router.register("resume", ResumeViewSet, basename="resume")
router.register("contact", ContactMessageViewSet, basename="contact")
router.register("settings", SiteSettingsViewSet, basename="site-settings")

urlpatterns = router.urls
