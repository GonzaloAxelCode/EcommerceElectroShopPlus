from rest_framework import serializers
from apps.shipping.models import Shipping


class ShippingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipping
        fields = '__all__'
