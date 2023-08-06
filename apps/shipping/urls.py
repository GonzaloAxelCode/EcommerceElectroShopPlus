from django.urls import path
from apps.shipping.views import GetShippingView
urlpatterns = [
    path("get-shipping-options", GetShippingView.as_view())
]
