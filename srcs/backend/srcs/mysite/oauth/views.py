import requests
from django.shortcuts import redirect
from django.http import HttpResponse, JsonResponse, FileResponse
<<<<<<< HEAD
<<<<<<< HEAD
=======
from django.views.decorators.http import require_http_methods
>>>>>>> hyeongsh
=======
from utils.decorators import require_http_methods
>>>>>>> hyeongsh
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

import os
from dotenv import load_dotenv
<<<<<<< HEAD
from utils.validation import validate_data, validate_header
from utils.authentication import get_access_token
<<<<<<< HEAD
from django.views.decorators.csrf import csrf_protect
=======
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
>>>>>>> hyeongsh
from users.models import TCDUser
=======
from utils.validation import check_json_data
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.views import APIView
from rest_framework.response import Response

from django.utils.decorators import method_decorator
from .models import TwoFactor
from .serializers import TwoFactorSerializer
from users.models import CustomUser
from users.serializers import CustomUserSerializer
>>>>>>> hyeongsh
import json
import pyotp
import qrcode
from django.conf import settings

from django.core.files.base import ContentFile
from rest_framework.permissions import AllowAny
from django.core.files.storage import default_storage

import logging
logger = logging.getLogger('oauth') 

# Create your views here.

# csrf 토큰을 받기위한 GET 메서드
<<<<<<< HEAD
<<<<<<< HEAD
@csrf_protect
def crsf(request):
    if request.method == 'GET':
        return JsonResponse({'message':"crsf_get"}, status=200)
    return JsonResponse({'error': 'Method not allowed'}, status=405)

# jwt토큰 반환 API
def token(request):
    if request.method == 'POST':
        error_response = validate_data(request, ['code'])
        if error_response:
            return error_response

        body_data = json.loads(request.body)
        code = body_data.get('code')
=======

# @method_decorator(ensure_csrf_cookie, name='dispatch')
class CsrfTokenView(APIView):
    # @ensure_csrf_cookie
    def get(self, request):

        return Response({
            'message': 'csrf_get'
        })


class TokenView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        check_json_data(request, ['code'])
        code = request.data.get('code')
>>>>>>> hyeongsh

        token_url = "https://api.intra.42.fr/oauth/token"
        data = {
            "code": code,
            "client_id": os.getenv("UID_KEY"),
            "client_secret": os.getenv("SECRET_KEY"),
            "redirect_uri": os.getenv("REDIRECTION_URI"),
            "grant_type": "authorization_code",
        }

<<<<<<< HEAD
        token_response = requests.post(token_url, data=data).json()
        if "error" in token_response:
            return JsonResponse({"error": token_response["error"]}, status=400)

        api_url = "https://api.intra.42.fr/v2/me"
        headers = {"Authorization": f"Bearer {token_response["access_token"]}"}
        api_response = requests.get(api_url, headers=headers).json()

        user, created = TCDUser.objects.update_or_create(
            id = api_response["id"],
            defaults = {
                "login": api_response["login"],
                "email": api_response["email"],
                "first_name": api_response["first_name"],
                "last_name": api_response["last_name"],
                "image_url": api_response["image"]["link"],
            },
        )

        two_factor_secret_key = user.two_factor_secret_key

        refresh_token = RefreshToken.for_user(user)
        return JsonResponse({
            'refresh_token': str(refresh_token),
            'access_token': str(refresh_token.access_token),
            'two_factor_required': not bool(two_factor_secret_key)
        })
    return JsonResponse({'error': 'Method not allowed'}, status=405)

def qrcode_image(request):
    if request.method == 'GET':
        access_token = get_access_token(request)
        try:
            # Access Token 검증
            token = AccessToken(access_token)  # 토큰 서명 및 유효성 검증
        except TokenError as e:
            # 검증 실패 (만료되었거나, 위조된 토큰)
            return JsonResponse({'message': f'Token is invalid: {str(e)}'}, status=401)
        user_id = token['user_id']  # 페이로드에서 user_id 추출

        # TCDUser 모델에서 user_id에 해당하는 사용자 정보 가져오기
        user = TCDUser.objects.get(id = user_id)

        # user에게 등록된 2fa코드가 이미 있다면 에러 반환
        if bool(user.two_factor_secret_key):
            return JsonResponse({
                'error':'이미 등록된 유저입니다.'
            }, status=401)
        
        # qrcode url생성하는데 필요한 변수들
        issuer = os.getenv('DJANGO_ISSUER')
        account_name = user.email
        secret = pyotp.random_base32()
        
        # 2fa 비밀키를 데이터베이스에 저장
        # [fix point] 추후 암호화해서 저장하는 로직이 필요함.
        user.two_factor_secret_key = secret
        user.save()
        
        qrCodeUrl = f"otpauth://totp/{issuer}:{account_name}?secret={secret}&issuer={issuer}"
        # qr = qrcode.make(qrCodeUrl)
        # qr.save(f"images/{user.login}_2fa_qr_code.png")  # 파일로 저장
        # file_path = f"./images/{user.login}_2fa_qr_code.png"

        # return FileResponse(open(file_path, "rb"), content_type="image/png")
        return JsonResponse({
            'qrCodeUrl':qrCodeUrl
        })
    return JsonResponse({'error': 'Method not allowed'}, status=405)

def refresh_qrcode_image(request):
    if request.method == 'GET':
        access_token = get_access_token(request)
        try:
            # Access Token 검증
            token = AccessToken(access_token)  # 토큰 서명 및 유효성 검증
        except TokenError as e:
            # 검증 실패 (만료되었거나, 위조된 토큰)
            return JsonResponse({'message': f'Token is invalid: {str(e)}'}, status=401)
        user_id = token['user_id']  # 페이로드에서 user_id 추출

        # TCDUser 모델에서 user_id에 해당하는 사용자 정보 가져오기
        user = TCDUser.objects.get(id = user_id)

        # 등록되지 않았아면 리프레시 해주지 않음.
        if not bool(user.two_factor_secret_key):
            return JsonResponse({
                'error':'아직 등록되지 않았습니다.'
            }, status=401)
        issuer = os.getenv('DJANGO_ISSUER')
        account_name = user.email
        secret = pyotp.random_base32()
        
        user.two_factor_secret_key = secret
        user.save()
        
        qrCodeUrl = f"otpauth://totp/{issuer}:{account_name}?secret={secret}&issuer={issuer}"
        # qr = qrcode.make(qrCodeUrl)
        # qr.save(f"images/{user.login}_2fa_qr_code.png")  # 파일로 저장
        # file_path = f"./images/{user.login}_2fa_qr_code.png"

        # return FileResponse(open(file_path, "rb"), content_type="image/png")
        return JsonResponse({
            'qrCodeUrl':qrCodeUrl
        })
    return JsonResponse({'error': 'Method not allowed'}, status=405)

# 2fa 검증용 코드
def authorisation_2fa(request):
=======
@ensure_csrf_cookie
@require_http_methods(['GET'])
def crsf(request):
    return JsonResponse({'message':"crsf_get"}, status=200)

# jwt토큰 반환 API
@require_http_methods(['POST'])
def token(request):
    error_response = validate_data(request, ['code'])
    if error_response:
        return error_response

    body_data = json.loads(request.body)
    code = body_data.get('code')

    token_url = "https://api.intra.42.fr/oauth/token"
    data = {
        "code": code,
        "client_id": os.getenv("UID_KEY"),
        "client_secret": os.getenv("SECRET_KEY"),
        "redirect_uri": os.getenv("REDIRECTION_URI"),
        "grant_type": "authorization_code",
    }

    token_response = requests.post(token_url, data=data).json()
    if "error" in token_response:
        return JsonResponse({"error": token_response["error"]}, status=400)

    api_url = "https://api.intra.42.fr/v2/me"
    headers = {"Authorization": f"Bearer {token_response["access_token"]}"}
    api_response = requests.get(api_url, headers=headers).json()

    user, created = TCDUser.objects.update_or_create(
        id = api_response["id"],
        defaults = {
            "login": api_response["login"],
            "email": api_response["email"],
            "first_name": api_response["first_name"],
            "last_name": api_response["last_name"],
            "image_url": api_response["image"]["link"],
        },
    )

    two_factor_secret_key = user.two_factor_secret_key

    refresh_token = RefreshToken.for_user(user)
    return JsonResponse({
        'refresh_token': str(refresh_token),
        'access_token': str(refresh_token.access_token),
        'two_factor_required': not bool(two_factor_secret_key)
    })

@require_http_methods(['GET'])
def qrcode_image(request):
    access_token = get_access_token(request)
    try:
        # Access Token 검증
        token = AccessToken(access_token)  # 토큰 서명 및 유효성 검증
    except TokenError as e:
        # 검증 실패 (만료되었거나, 위조된 토큰)
        return JsonResponse({'message': f'Token is invalid: {str(e)}'}, status=401)
    user_id = token['user_id']  # 페이로드에서 user_id 추출

    # TCDUser 모델에서 user_id에 해당하는 사용자 정보 가져오기
    user = TCDUser.objects.get(id = user_id)

    # user에게 등록된 2fa코드가 이미 있다면 에러 반환
    if bool(user.two_factor_secret_key):
        return JsonResponse({
            'error':'이미 등록된 유저입니다.'
        }, status=401)

    # qrcode url생성하는데 필요한 변수들
    issuer = os.getenv('DJANGO_ISSUER')
    account_name = user.email
    secret = pyotp.random_base32()

    # 2fa 비밀키를 데이터베이스에 저장
    # [fix point] 추후 암호화해서 저장하는 로직이 필요함.
    user.two_factor_secret_key = secret
    user.save()

    qrCodeUrl = f"otpauth://totp/{issuer}:{account_name}?secret={secret}&issuer={issuer}"
    # qr = qrcode.make(qrCodeUrl)
    # qr.save(f"images/{user.login}_2fa_qr_code.png")  # 파일로 저장
    # file_path = f"./images/{user.login}_2fa_qr_code.png"
    
    # return FileResponse(open(file_path, "rb"), content_type="image/png")
    return JsonResponse({
        'qrCodeUrl':qrCodeUrl
    })

@require_http_methods(['GET'])
def refresh_qrcode_image(request):
    access_token = get_access_token(request)
    try:
        # Access Token 검증
        token = AccessToken(access_token)  # 토큰 서명 및 유효성 검증
    except TokenError as e:
        # 검증 실패 (만료되었거나, 위조된 토큰)
        return JsonResponse({'message': f'Token is invalid: {str(e)}'}, status=401)
    user_id = token['user_id']  # 페이로드에서 user_id 추출
    
    # TCDUser 모델에서 user_id에 해당하는 사용자 정보 가져오기
    user = TCDUser.objects.get(id = user_id)
    
    # 등록되지 않았아면 리프레시 해주지 않음.
    if not bool(user.two_factor_secret_key):
        return JsonResponse({
            'error':'아직 등록되지 않았습니다.'
        }, status=401)
    issuer = os.getenv('DJANGO_ISSUER')
    account_name = user.email
    secret = pyotp.random_base32()
    
    user.two_factor_secret_key = secret
    user.save()
    
    qrCodeUrl = f"otpauth://totp/{issuer}:{account_name}?secret={secret}&issuer={issuer}"
    # qr = qrcode.make(qrCodeUrl)
    # qr.save(f"images/{user.login}_2fa_qr_code.png")  # 파일로 저장
    # file_path = f"./images/{user.login}_2fa_qr_code.png"
    
    # return FileResponse(open(file_path, "rb"), content_type="image/png")
    return JsonResponse({
        'qrCodeUrl':qrCodeUrl
    })

# 2fa 검증용 코드
def authorization_2fa(request):
>>>>>>> hyeongsh
    user_otp = request.GET.get('user_otp')
    access_token = get_access_token(request)
    try:
        token = AccessToken(access_token)
    except TokenError as e:
        return JsonResponse({'message': f'Token is invalid: {str(e)}'}, status=401)
    user_id = token['user_id']
    
    user = TCDUser.objects.get(id = user_id)
    totp = pyotp.TOTP(user.two_factor_secret_key)
    otp = totp.now()
    if otp == user_otp:
        return JsonResponse({
            'message': '코드가 올바릅니다',
            'correct_otp': otp,
            'user_otp': user_otp
        }, status=200)
    return JsonResponse({
        'error': '코드가 다릅니다.',
        'correct_otp': otp,
        'user_otp': user_otp
    }, status=401)

# FE가 해줘야하는 로직
def show_qr_image(request):
    qrCodeUrl = request.GET.get('qrCodeUrl')
    qr = qrcode.make(qrCodeUrl)
    qr.save(f"images/2fa_qr_code.png")  # 파일로 저장
    file_path = f"./images/2fa_qr_code.png"
    return FileResponse(open(file_path, "rb"), content_type="image/png")

# FE가 해줘야하는 로직
def callback(request):
    code = request.GET.get('code')
    return JsonResponse({"code": code})

# FE가 해줘야하는 로직
def login(request):
    auth_url = os.getenv("AUTH_URL")
    client_id = os.getenv("UID_KEY")
    redirect_uri = os.getenv("REDIRECTION_URI")
    response_type = "code"

    auth_url = f"{auth_url}?client_id={client_id}&redirect_uri={redirect_uri}&response_type={response_type}"
<<<<<<< HEAD
    return redirect(auth_url)
=======
    return redirect(auth_url)
>>>>>>> hyeongsh
=======
        token_response = requests.post(token_url, data=data)
        if token_response.status_code != 200:
            return Response(token_response.json(), status=token_response.status_code)
        token_data = token_response.json()

        api_url = "https://api.intra.42.fr/v2/me"
        headers = {"Authorization": f"Bearer {token_data["access_token"]}"}

        api_response = requests.get(api_url, headers=headers)
        if api_response.status_code != 200:
            return Response(api_response.json(), status=api_response.status_code)
        api_data = api_response.json()

        user, created = CustomUser.objects.get_or_create(
            id = api_data['id'],
            username = api_data['login'],
            email = api_data['email'],
        )

        file_name = f'_{user.id}.png'
        file_path = user.profile_image.field.upload_to + '/' + file_name

        if not default_storage.exists(file_path):
            image_response = requests.get(api_data["image"]["link"])
            if image_response.status_code != 200:
                return Response(image_response.json(), status=image_response.status_code)
            user.profile_image.save(file_name, ContentFile(image_response.content), save=True)

        refresh_token = RefreshToken.for_user(user)
        refresh_token['is_2fa_authenticated'] = False
        access_token = refresh_token.access_token
        access_token['is_2fa_authenticated'] = False
        
        response = Response({
            'access_token': str(access_token),
        })

        response.set_cookie(
            key='refresh_token',
            value=str(refresh_token),
            httponly=True,
            secure=True,
            samesite='Lax',
            max_age=7 * 24 * 60 * 60
        )
        return response


class TokenRefreshView(APIView):
    authentication_classes = []
    permission_classes = []
    def post(self, request):
        old_refresh_token = request.COOKIES.get('refresh_token')
        try:
            old_refresh_token = RefreshToken(old_refresh_token)
        except TokenError as e:
            error_message = {
                "detail": "Given token not valid for any token type",
                "code": "token_not_valid",
                "messages": [
                    {
                        "token_class": "RefreshToken",
                        "token_type": "refresh",
                        "message": str(e)
                    }
                ]
            }
            return Response(error_message, status=401)
        user = CustomUser.objects.get(id=old_refresh_token['user_id'])

        new_refresh_token = RefreshToken.for_user(user)
        new_refresh_token['is_2fa_authenticated'] = old_refresh_token['is_2fa_authenticated']
        new_access_token = new_refresh_token.access_token
        new_access_token['is_2fa_authenticated'] = old_refresh_token['is_2fa_authenticated']

        response = Response({
            'access_token': str(new_access_token),
        })
        response.set_cookie(
            key='refresh_token',
            value=str(new_refresh_token),
            httponly=True,
            secure=True,
            samesite='Lax',
            max_age=7 * 24 * 60 * 60
        )
        return response

class TwoFactorView(APIView):
    permission_classes = []
    def get(self, request):
        user = request.user

        # qrcode url생성하는데 필요한 변수들
        issuer = os.getenv('DJANGO_ISSUER')
        account_name = user.email
        secret = pyotp.random_base32()

        qr_code_url = f"otpauth://totp/{issuer}:{account_name}?secret={secret}&issuer={issuer}"
        qr = qrcode.make(qr_code_url)

        # 이미지 저장 경로 설정
        file_name = f"_{user.id}_2fa_qr_code.png"
        relative_path = f"two_factor_qr_code/{file_name}"  # MEDIA_ROOT 하위 경로
        full_path = f"{settings.MEDIA_ROOT}/{relative_path}"
        qr.save(full_path)  # 파일로 저장

        # 2fa 비밀키를 데이터베이스에 저장
        # [fix point] 추후 암호화해서 저장하는 로직이 필요함.
        two_factor, created = TwoFactor.objects.get_or_create(custom_user=user)
        two_factor.two_factor_secret_code = secret
        two_factor.two_factor_qr_code_image.name = relative_path  # FileField에 상대 경로 저장
        two_factor.save()

        serializer = TwoFactorSerializer(two_factor, many=False)  # many=True 옵션
        return Response(serializer.data, status=200)

    def post(self, request):
        check_json_data(request, ['otp_code'])
        otp_code = request.data.get('otp_code')
        user = request.user

        totp = pyotp.TOTP(user.twofactor.two_factor_secret_code)
        cur_otp_code = totp.now()
        if cur_otp_code == otp_code:
            refresh_token = RefreshToken.for_user(user)
            refresh_token['is_2fa_authenticated'] = True
            access_token = refresh_token.access_token
            access_token['is_2fa_authenticated'] =True

            response = Response({
                'access_token': access_token
            })

            response.set_cookie(
                key='refresh_token',
                value=str(refresh_token),
                httponly=True,
                secure=True,
                samesite='Lax',
                max_age=7 * 24 * 60 * 60
            )
            return response
        return Response({
            'error': '인증코드가 틀렸습니다.'
        }, status=403)
>>>>>>> hyeongsh
