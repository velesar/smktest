from django.shortcuts import render, redirect
from django.views.generic import ListView
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout


class ProductView(ListView):
    def get(self, request):
        return render(request, 'index.html')


def auth_login(request):
    if request.method == "POST":

        user = authenticate(username=request.POST['username'], password=request.POST['password'])
        if user is not None:
            login(request, user)
            return redirect('index')
        else:
            return render(request, 'registration/login.html', { 'error': True, 'message': 'There is no such user in system' })
    else:
        return render(request, 'registration/login.html')


def auth_logout(request):
    logout(request)
    return redirect('index')


def register(request):
    form = UserCreationForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect('login')
    return render(request, 'registration/register.html', {'form': form})
