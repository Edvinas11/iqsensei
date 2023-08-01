from django.contrib import admin
from django.urls import path, include

# For testing purposes
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('courses/', include('courses.urls')),
]

# For testing purposes
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)