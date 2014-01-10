from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):

    title = models.CharField(max_length=255)
    img = models.CharField(max_length=255)
    text = models.CharField(max_length=255)


class Review(models.Model):

    product = models.ForeignKey(Product)
    rate = models.IntegerField()
    text = models.CharField(max_length=255)
    created_by = models.ForeignKey(User)
    created_at = models.DateTimeField(auto_now=True)