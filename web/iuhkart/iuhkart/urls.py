"""
URL configuration for iuhkart project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

swagger_urlpatterns = [
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc')
]

urlpatterns = swagger_urlpatterns + [
    path('admin/', admin.site.urls),
    path('user/',include('apps.account.urls')),
    path('address/',include('apps.address.urls')),
    path('cart/', include('apps.cart.urls')),
    path('product/', include('apps.product.urls')),
    path('review/', include('apps.review.urls')),
    path('order/', include('apps.order.urls')),
    path('discount/', include('apps.discount.urls')),
    path('dashboard/', include('apps.dashboard.urls')),
]