from django.urls import path
from apps.cart.views import GetItemView, AddItemView, GetTotalView, GetItemTotalView, UpdateItemView, RemoveItemView, EmptyCartView, SyncCartView

urlpatterns = [
    path("cart-items", GetItemView.as_view()),
    path("add-item", AddItemView.as_view()),
    path("get-total", GetTotalView.as_view()),
    path("get-item-total", GetItemTotalView.as_view()),
    path("update-item", UpdateItemView.as_view()),
    path("remove-cart", RemoveItemView.as_view()),
    path("empty-cart", EmptyCartView.as_view()),
    path("synch", SyncCartView.as_view())
]
