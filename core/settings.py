from datetime import timedelta
import os

from pathlib import Path
import environ
env = environ.Env()
environ.Env.read_env()
ENVIRONMENT = env


BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get("SECRET_KEY")


DEBUG = True
DOMAIN =os.environ.get("DOMAIN")
ALLOWED_HOSTS = [
    "localhost:8000",
    "http://127.0.0.1:8000",
    "http://localhost:8000",
    "localhost",
    "127.0.0.1",
    "https://ecomerce-gonzalo.onrender.com",
    ".ecomerce-gonzalo.onrender.com",
    "www.ecomerce-gonzalo.onrender.com",
    "ecomerce-gonzalo.onrender.com",
    "http://192.168.10.100:3000",
    "192.168.10.100:3000"
]


# Application definition

DJANGO_APPS = [
    'django.contrib.admin', 
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

PROJECT_APPS = [
    "apps.user"
]
ECOMMERCE_APPS = [
    "apps.category",
    "apps.product",
    "apps.cart",
    "apps.shipping",
    "apps.orders",
    "apps.payment",
    "apps.coupons",
    "apps.reviews",
    "apps.wishlist",
    "apps.user_profile"
]
THIRD_PARTY_APPS = [
    "corsheaders",
    "rest_framework",
    "djoser",
    "social_django",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "ckeditor",
    "ckeditor_uploader",
    'cloudinary_storage',
    'cloudinary',
]

INSTALLED_APPS = DJANGO_APPS + PROJECT_APPS + ECOMMERCE_APPS + THIRD_PARTY_APPS


CKEDITOR_CONFIGS = {
    'default': {
        'toolbar': 'full',
        'autoParagraph': False
    }
}

CKEDITOR_UPLOAD_PATH = "/media/"


MIDDLEWARE = [
    'social_django.middleware.SocialAuthExceptionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'


DATABASES = {
    "default": env.db("DATABASE_URL", default="postgres:///ninerogues"),
}
DATABASES["default"]["ATOMIC_REQUESTS"] = True

CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000',
    'http://localhost:8000',
    'http://127.0.0.1:8000',
    'http://127.0.0.1:3000',
    'https://ecomerce-gonzalo.onrender.com',

]

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:8000',
    'http://127.0.0.1:8000',
    'http://127.0.0.1:3000',
    'https://ecomerce-gonzalo.onrender.com'
]


PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.Argon2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher",
    "django.contrib.auth.hashers.BCryptSHA256PasswordHasher",
]


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/Lima'

USE_I18N = True

USE_TZ = True


STATIC_URL = '/static/'


#Media and images ,videos etc

MEDIA_URL = '/media/'

DEFAULT_FILE_STORAGE= "cloudinary_storage.storage.MediaCloudinaryStorage"


CLOUDINARY_STORAGE = {
    'CLOUD_NAME': os.environ.get("CLOUD_NAME"),
    'API_KEY': os.environ.get("API_KEY_CLOUDINARY"),
    'API_SECRET': os.environ.get("API_SECRET_CLOUDINARY")
}





STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'build/static')
]




REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 12
}

AUTHENTICATION_BACKENDS = (
    'social_core.backends.google.GoogleOAuth2',
    'social_core.backends.facebook.FacebookOAuth2',
    'django.contrib.auth.backends.ModelBackend',
)
SIMPLE_JWT = {
    "AUTH_HEADER_TYPES": ("JWT",),
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=10080),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),
    "ROTATE_REFRESH_TOKEN": True,
    "AUTH_TOKEN_CLASES": (
        "rest_framework_simplejwt.tokens.AccessToken"
    )
}


DJOSER = {
    'LOGIN_FIELD': 'email',
    'USER_CREATE_PASSWORD_RETYPE': True,
    'USERNAME_CHANGED_EMAIL_CONFIRMATION': True,
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION': True,
    'SEND_CONFIRMATION_EMAIL': True,
    'SET_USERNAME_RETYPE': True,
    'PASSWORD_RESET_CONFIRM_URL': 'password/reset/confirm/{uid}/{token}',
    'SET_PASSWORD_RETYPE': True,
    'PASSWORD_RESET_CONFIRM_RETYPE': True,
    'USERNAME_RESET_CONFIRM_URL': 'email/reset/confirm/{uid}/{token}',
    'ACTIVATION_URL': 'activate/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL': True,
    'SOCIAL_AUTH_TOKEN_STRATEGY': 'djoser.social.token.jwt.TokenStrategy',
    'SOCIAL_AUTH_ALLOWED_REDIRECT_URIS': ['http://localhost:8000/google', 'http://localhost:8000/facebook'],
    'SERIALIZERS': {
        'user_create': 'apps.user.serializers.UserAcountCreateSerializer',
        'user': 'apps.user.serializers.UserAcountCreateSerializer',
        'current_user': 'apps.user.serializers.UserAcountCreateSerializer',
        'user_delete': 'djoser.serializers.UserDeleteSerializer',
    },
}

BT_PRIVATE_KEY = os.environ.get("BT_PRIVATE_KEY")
BT_PUBLIC_KEY = os.environ.get("BT_PUBLIC_KEY")
BT_MERCHANT_ID = os.environ.get("BT_MERCHANT_ID")
BT_ENVIRONMENT = os.environ.get("BT_ENVIRONMENT")

AUTH_USER_MODEL = "user.UserAccount"




EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'gonzaloaxelh@gmail.com'
EMAIL_HOST_PASSWORD = 'fjsjfbbwlaxplddg'

'''
# conectart el envio de correos electronicos
DEFAULT_FROM_EMAIL = "Ecomerce - Plataforma de cursos <gonzaloaxelh@gmail.com>"
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = os.environ.get("EMAIL_HOST")
EMAIL_HOST_USER = os.environ.get("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD")
EMAIL_PORT = os.environ.get("EMAIL_PORT")
EMAIL_USE_TLS = os.environ.get("EMAIL_USE_TLS ")
'''



'''
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

    

mode_development = DEBUG
if not mode_development:
    DEFAULT_FROM_EMAIL = "Ecomerce - Plataforma de cursos <gonzaloaxelh@gmail.com>"
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
    EMAIL_HOST = env("EMAIL_HOST")
    EMAIL_HOST_USER = env("EMAIL_HOST_USER")
    EMAIL_HOST = PASSWORD = env("EMAIL_HOST_PASSWORD")
    EMAIL_PORT = env("EMAIL_POST")
    EMAIL_USE_TLS = env("EMAIL_USE_TLS")


'''