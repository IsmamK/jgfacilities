from django.db import models

# Create your models here.

from django.db import models

class ComponentData(models.Model):
    name = models.CharField(max_length=255, unique=True)  # Component identifier
    data = models.JSONField()  # Use the built-in JSONField
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} - {self.email}"