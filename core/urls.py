from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

from django.conf.urls.static import static
# conectar el build de react como templates para django
urlpatterns = [
    path('admin/', admin.site.urls),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.jwt")),
    path("auth/", include("djoser.social.urls")),
    path("api/category/", include("apps.category.urls")),
    path("api/product/", include("apps.product.urls")),
    path("api/cart/", include("apps.cart.urls")),
    path("api/shipping/", include("apps.shipping.urls")),
    path("api/payment/", include("apps.payment.urls")),
    path("api/orders/",include("apps.orders.urls")),
    path('api/coupons/', include('apps.coupons.urls')),
    path('api/profile/', include('apps.user_profile.urls')),
    path('api/wishlist/', include('apps.wishlist.urls')),
    path('api/reviews/', include('apps.reviews.urls')),
] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*',
                        TemplateView.as_view(template_name='index.html'))]



