from django.conf.urls import patterns, url, include

from .views import ProductListView, ReviewListView, ReviewView, RegisterView

urlpatterns = patterns('',
    url(r'^products/$', ProductListView.as_view()),
    url(r'^reviews/(?P<product_id>[0-9]+)$', ReviewListView.as_view()),
    url(r'^review/(?P<pk>[0-9]+)$', ReviewView.as_view()),
    url(r'^register/$', RegisterView.as_view()),
    url(r'^oauth2/', include('provider.oauth2.urls', namespace='oauth2')),
)
