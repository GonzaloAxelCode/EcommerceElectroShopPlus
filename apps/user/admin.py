from django.contrib import admin
# Register your models here.
from django.contrib.auth import get_user_model

User = get_user_model()


class UserAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "email",
                    "is_staff", "is_superuser", "is_active", "last_login")
    list_display_links = ("first_name", "last_name", "email",)
    search_fields = ("first_name", "last_name", "email",
                     "is_staff", "is_superuser", "is_active", "last_login")
    list_per_page = 25


admin.site.register(User, UserAdmin)
