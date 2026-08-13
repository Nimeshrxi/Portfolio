"""API views for portfolio content."""
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle

from .models import (
    Achievement,
    ContactMessage,
    Education,
    Experience,
    Profile,
    Project,
    Resume,
    SiteSettings,
    SkillCategory,
    SocialLink,
)
from .permissions import IsAdminUserOrReadOnly
from .serializers import (
    AchievementSerializer,
    ContactMessageSerializer,
    EducationSerializer,
    ExperienceSerializer,
    ProfileSerializer,
    ProjectSerializer,
    ResumeSerializer,
    SiteSettingsSerializer,
    SkillCategorySerializer,
    SocialLinkSerializer,
)


class PublicAdminModelViewSet(viewsets.ModelViewSet):
    """Public reads with staff-only create, update, and delete."""

    permission_classes = [IsAdminUserOrReadOnly]


class ProfileViewSet(PublicAdminModelViewSet):
    serializer_class = ProfileSerializer

    def get_queryset(self):
        queryset = Profile.objects.all()
        if self.request.method in permissions.SAFE_METHODS:
            queryset = queryset.filter(is_active=True)
        return queryset


class ProjectViewSet(PublicAdminModelViewSet):
    serializer_class = ProjectSerializer
    lookup_field = "slug"

    def get_queryset(self):
        queryset = Project.objects.prefetch_related("images").all()
        category = self.request.query_params.get("category")
        featured = self.request.query_params.get("featured")
        if category and category != Project.Category.ALL:
            queryset = queryset.filter(category=category)
        if featured in ("1", "true", "True", "yes"):
            queryset = queryset.filter(is_featured=True)
        return queryset.order_by('-created_at')


class SkillCategoryViewSet(PublicAdminModelViewSet):
    serializer_class = SkillCategorySerializer
    queryset = SkillCategory.objects.prefetch_related("skills").all()


class ExperienceViewSet(PublicAdminModelViewSet):
    serializer_class = ExperienceSerializer
    queryset = Experience.objects.all()


class EducationViewSet(PublicAdminModelViewSet):
    serializer_class = EducationSerializer
    queryset = Education.objects.all()


class AchievementViewSet(PublicAdminModelViewSet):
    serializer_class = AchievementSerializer
    queryset = Achievement.objects.all()


class SocialLinkViewSet(PublicAdminModelViewSet):
    serializer_class = SocialLinkSerializer

    def get_queryset(self):
        queryset = SocialLink.objects.all()
        if self.request.method in permissions.SAFE_METHODS:
            queryset = queryset.filter(is_active=True)
        return queryset


class ResumeViewSet(PublicAdminModelViewSet):
    serializer_class = ResumeSerializer

    def get_queryset(self):
        queryset = Resume.objects.all()
        if self.request.method in permissions.SAFE_METHODS:
            queryset = queryset.filter(is_active=True)
        return queryset


class SiteSettingsViewSet(PublicAdminModelViewSet):
    serializer_class = SiteSettingsSerializer

    def get_queryset(self):
        queryset = SiteSettings.objects.all()
        if self.request.method in permissions.SAFE_METHODS:
            queryset = queryset.filter(is_active=True)
        return queryset


class ContactMessageViewSet(viewsets.ModelViewSet):
    serializer_class = ContactMessageSerializer
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "contact"
    queryset = ContactMessage.objects.all()

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {
                "success": True,
                "message": "Signal received. I will get back to you soon.",
                "id": serializer.instance.pk,
            },
            status=status.HTTP_201_CREATED,
            headers=headers,
        )

    @action(detail=False, methods=["get"], permission_classes=[permissions.IsAdminUser])
    def unread(self, request):
        """Get unread contact messages."""
        unread_count = ContactMessage.objects.filter(is_read=False).count()
        return Response({"unread_count": unread_count})
