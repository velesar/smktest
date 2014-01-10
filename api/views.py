from django.contrib.auth.models import User

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.compat import oauth2_provider_models
from rest_framework.permissions import AllowAny
from rest_framework.permissions import BasePermission

from products.models import Product, Review
from .serializers import ProductSerializer, ReviewSerializer, UserSerializer


class IsAuthenticatedOrReadOnly(BasePermission):
    """
    The request is authenticated as a user, or is a read-only request.
    """

    def has_permission(self, request, view):
        if request.method == 'GET' or request.user:
            return True
        return False


class ProductListView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = (AllowAny,)

    def get(self, request, *args, **kwargs):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ReviewListView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    model = Review
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, *args, **kwargs):
        reviews = Review.objects.filter(product=kwargs['product_id'])
        serializer = ReviewSerializer(reviews)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        created_by = request.user
        try:
            product = Product.objects.get(id=kwargs['product_id'])
        except Product.DoesNotExist:
            return Response({'success': False, 'message': 'Product does not exists.'})
        try:
            rate = request.DATA['rate']
            text = request.DATA['text']
        except KeyError:
            return Response({'success': False, 'message': 'Required parameters does not provided.'},
                            status=status.HTTP_400_BAD_REQUEST)
        Review.objects.create(rate=rate, text=text, product=product,
                              created_by=created_by)
        return Response({'success': True})


class ReviewView(generics.RetrieveAPIView):
    serializer_class = ReviewSerializer
    model = Review
    permission_classes = (AllowAny,)


class RegisterView(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    model = User
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        username = request.DATA['username']
        password = request.DATA['password']
        try:
            user = User.objects.get(username=username)
            return Response({'success': False, 'message': 'User with such username already exists'})
        except User.DoesNotExist:
            user = User.objects.create(username=username)
            user.set_password(password)
            user.save()
            client = oauth2_provider_models.Client.objects.create(user=user, client_type=0)
            client.save()
            return Response({'success': True,
                             'id': user.id,
                             'client_key': client.client_id,
                             'client_secret': client.client_secret},
                            status=status.HTTP_201_CREATED)














