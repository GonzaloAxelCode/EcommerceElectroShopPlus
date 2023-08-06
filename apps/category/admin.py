from django.contrib import admin

# Register your models here.
from apps.category.models import Category


class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "parent")
    list_display_links = ("id", "name", "parent")
    search_fields = ("name", "parent")
    list_per_page: 25


admin.site.register(Category, CategoryAdmin)
