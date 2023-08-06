from django.urls import path
from apps.category.views import ListCategoriesView

urlpatterns = [
    path("categories", ListCategoriesView.as_view())
]
