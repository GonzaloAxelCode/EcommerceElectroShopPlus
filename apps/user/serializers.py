from djoser.serializers import UserCreateSerializer

from django.contrib.auth import get_user_model
User = get_user_model()

class UserAcountCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model =User
        fields =(
            "id",
            "email",
            "first_name",
            "last_name",
            "get_full_name",
            "get_short_name"
        )







