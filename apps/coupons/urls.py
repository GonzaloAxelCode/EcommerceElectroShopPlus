from django.urls import path
from apps.coupons.views import CheckCouponView

urlpatterns = [
    path('check-coupon', CheckCouponView.as_view()),
]