from django.db import models

class Question(models.Model):
    department = models.CharField(max_length=100) # e.g. "HR", "IT"
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text