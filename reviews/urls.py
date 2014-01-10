from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings

from products.views import ProductView

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', ProductView.as_view(), name='index'),
    url(r'^api/', include('api.urls')),
    url(r'^logout/$', 'products.views.auth_logout', name='logout'),
    url(r'^login/$', 'products.views.auth_login', name='login'),
    url(r'^register/$', 'products.views.register', name='register'),
    
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
