from django.contrib.auth.models import User

from rest_framework import serializers

from products.models import Product, Review


class UserSerializer(serializers.ModelSerializer):
    id = serializers.Field(source='pk')

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name','email',)


class ProductSerializer(serializers.ModelSerializer):
    id = serializers.Field(source='pk')

    class Meta:
        model = Product
        fields = ('id', 'title', 'img', 'text')


class ReviewSerializer(serializers.ModelSerializer):
    id = serializers.Field(source='pk')
    created_by = UserSerializer()

    class Meta:
        model = Review
        fields = ('id', 'product', 'rate', 'text', 'created_by', 'created_at')


class UserSerializer(serializers.ModelSerializer):
    id = serializers.Field(source='pk')

    class Meta:
        model = User
        fields = ('id', 'username')
