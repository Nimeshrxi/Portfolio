"""Portfolio domain models."""
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils.text import slugify

from .validators import validate_contact_message_length, validate_proficiency


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Profile(TimeStampedModel):
    """Singleton-ish profile for the portfolio owner."""

    name = models.CharField(max_length=120)
    title = models.CharField(max_length=255)
    bio = models.TextField(blank=True)
    intro = models.TextField(blank=True, help_text="Hero / intro copy")
    who_i_am = models.TextField(blank=True)
    what_i_build = models.TextField(blank=True)
    what_i_know = models.TextField(blank=True)
    what_im_learning = models.TextField(blank=True)
    where_im_going = models.TextField(blank=True)
    avatar = models.ImageField(upload_to="profile/", blank=True, null=True)
    location = models.CharField(max_length=120, blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=40, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profiles"
        ordering = ["-updated_at"]

    def __str__(self):
        return self.name


class Project(TimeStampedModel):
    class Category(models.TextChoices):
        ALL = "ALL", "All"
        PYTHON = "PYTHON", "Python"
        DJANGO = "DJANGO", "Django"
        AI = "AI", "AI"
        DATA = "DATA", "Data"
        WEB = "WEB", "Web"
        DATABASE = "DATABASE", "Database"
        AUTOMATION = "AUTOMATION", "Automation"
        OTHER = "OTHER", "Other"

    class Status(models.TextChoices):
        ACTIVE = "ACTIVE", "Active Development"
        COMPLETED = "COMPLETED", "Completed"
        IN_PROGRESS = "IN_PROGRESS", "In Progress"
        MAINTAINED = "MAINTAINED", "Maintained"
        ARCHIVED = "ARCHIVED", "Archived"

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    category = models.CharField(
        max_length=20,
        choices=Category.choices,
        default=Category.OTHER,
    )
    short_description = models.CharField(max_length=300, blank=True)
    description = models.TextField(blank=True)
    problem = models.TextField(blank=True)
    solution = models.TextField(blank=True)
    features = models.JSONField(
        default=list,
        blank=True,
        help_text='List of feature strings, e.g. ["Project CRUD", "REST API"]',
    )
    architecture = models.TextField(blank=True)
    database = models.TextField(blank=True)
    challenges = models.TextField(blank=True)
    learning = models.TextField(blank=True)
    tech_stack = models.JSONField(
        default=list,
        blank=True,
        help_text='List of technologies, e.g. ["Python", "Django"]',
    )
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    featured_image = models.ImageField(
        upload_to="projects/", blank=True, null=True
    )
    is_featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    status = models.CharField(
        max_length=30,
        choices=Status.choices,
        default=Status.ACTIVE,
    )
    completion_date = models.DateField(blank=True, null=True)

    class Meta:
        ordering = ["order", "-created_at"]
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.title) or "project"
            slug = base
            n = 1
            while Project.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{n}"
                n += 1
            self.slug = slug
        super().save(*args, **kwargs)


class ProjectImage(models.Model):
    project = models.ForeignKey(
        Project,
        related_name="images",
        on_delete=models.CASCADE,
    )
    image = models.ImageField(upload_to="projects/gallery/")
    caption = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Project Image"
        verbose_name_plural = "Project Images"

    def __str__(self):
        return f"{self.project.title} - image {self.order}"


class SkillCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]
        verbose_name = "Skill Category"
        verbose_name_plural = "Skill Categories"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.name) or "category"
            slug = base
            n = 1
            while SkillCategory.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{n}"
                n += 1
            self.slug = slug
        super().save(*args, **kwargs)


class Skill(models.Model):
    category = models.ForeignKey(
        SkillCategory,
        related_name="skills",
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=100)
    proficiency = models.PositiveSmallIntegerField(
        default=70,
        validators=[MinValueValidator(1), MaxValueValidator(100), validate_proficiency],
        help_text="Proficiency 1-100",
    )
    icon = models.CharField(
        max_length=100,
        blank=True,
        help_text="Optional icon name / CSS class / asset key",
    )
    order = models.PositiveIntegerField(default=0)
    spider_sense_highlight = models.BooleanField(
        default=False,
        help_text="Highlight in Spider-Sense HUD",
    )

    class Meta:
        ordering = ["order", "name"]
        verbose_name = "Skill"
        verbose_name_plural = "Skills"

    def __str__(self):
        return f"{self.name} ({self.category.name})"


class Experience(TimeStampedModel):
    company = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    location = models.CharField(max_length=120, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    is_current = models.BooleanField(default=False)
    description = models.TextField(blank=True)
    technologies = models.JSONField(
        default=list,
        blank=True,
        help_text='List of technologies, e.g. ["Django", "PostgreSQL"]',
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "-start_date"]
        verbose_name = "Experience"
        verbose_name_plural = "Experience"

    def __str__(self):
        return f"{self.role} @ {self.company}"


class Education(TimeStampedModel):
    institution = models.CharField(max_length=255)
    degree = models.CharField(max_length=200)
    field = models.CharField(max_length=200, blank=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True)
    relevant_coursework = models.JSONField(default=list, blank=True)
    projects = models.JSONField(default=list, blank=True)
    achievements = models.JSONField(default=list, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "-end_date", "-start_date"]
        verbose_name = "Education"
        verbose_name_plural = "Education"

    def __str__(self):
        return f"{self.degree} - {self.institution}"


class Achievement(TimeStampedModel):
    category = models.CharField(max_length=120, blank=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    year = models.PositiveIntegerField(blank=True, null=True)
    icon = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to="achievements/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "-year"]
        verbose_name = "Achievement"
        verbose_name_plural = "Achievements"

    def __str__(self):
        return self.title


class SocialLink(models.Model):
    platform = models.CharField(max_length=80)
    url = models.URLField()
    icon = models.CharField(max_length=100, blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "platform"]
        verbose_name = "Social Link"
        verbose_name_plural = "Social Links"

    def __str__(self):
        return self.platform


class Resume(TimeStampedModel):
    title = models.CharField(max_length=200, default="Resume")
    file = models.FileField(upload_to="resumes/", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-uploaded_at"]
        verbose_name = "Resume"
        verbose_name_plural = "Resumes"

    def __str__(self):
        status = "active" if self.is_active else "inactive"
        return f"{self.title} ({status})"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.is_active:
            Resume.objects.exclude(pk=self.pk).filter(is_active=True).update(
                is_active=False
            )


class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField(validators=[validate_contact_message_length])
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"

    def __str__(self):
        return f"{self.name}: {self.subject or self.message[:40]}"


class SiteSettings(TimeStampedModel):
    """Singleton-ish site-wide settings."""

    site_name = models.CharField(max_length=120, default="Nimesh Rai")
    tagline = models.CharField(max_length=255, blank=True)
    meta_description = models.TextField(blank=True)
    og_image = models.ImageField(upload_to="site/", blank=True, null=True)
    enable_spider_sense = models.BooleanField(default=True)
    enable_easter_eggs = models.BooleanField(default=True)
    contact_email = models.EmailField(blank=True)
    footer_text = models.CharField(max_length=255, blank=True)
    github_username = models.CharField(max_length=100, blank=True)
    linkedin_url = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"
        ordering = ["-updated_at"]

    def __str__(self):
        return self.site_name
