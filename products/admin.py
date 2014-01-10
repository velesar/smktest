from models import Product, Review
from django.contrib import admin

class ProductAdmin(admin.ModelAdmin):
      list_display    = ['title', 'text', 'img']

class ReviewAdmin(admin.ModelAdmin):
      list_display    = ['product', 'rate', 'text', 'created_by']

admin.site.register(Product, ProductAdmin)
admin.site.register(Review, ReviewAdmin)
