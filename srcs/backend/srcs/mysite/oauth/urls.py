from django.urls import path
from . import views
# from rest_framework_simplejwt.views import (
#     TokenRefreshView,
# )

urlpatterns = [
    # # csrf토큰 발급용 api
    path('csrf', views.CsrfTokenView.as_view()),
    
    # # jwt token관련 api
    path('token', views.TokenView.as_view()),
    path('token/refresh', views.TokenRefreshView.as_view()),

<<<<<<< HEAD
    # 2fa 관련 api
    path('2fa', views.qrcode_image),
    path('2fa/refresh', views.refresh_qrcode_image),

    # 테스트 api
    path('2fa/image', views.show_qr_image),
<<<<<<< HEAD
    path('2fa/authorize', views.authorisation_2fa),
=======
    path('2fa/authorize', views.authorization_2fa),
>>>>>>> hyeongsh
    path('callback', views.callback),
    path('login', views.login),
=======
    # # 2fa 관련 api
    path('2fa', views.TwoFactorView.as_view()),
>>>>>>> hyeongsh
]