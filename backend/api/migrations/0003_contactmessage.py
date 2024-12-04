# Generated by Django 5.1.3 on 2024-12-02 01:04

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0002_componentdata_delete_uploadedimage"),
    ]

    operations = [
        migrations.CreateModel(
            name="ContactMessage",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                ("email", models.EmailField(max_length=254)),
                ("message", models.TextField()),
                ("submitted_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]