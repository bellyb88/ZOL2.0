from .models import CustomUser

#Auth Backend - login by email

class EmailAuthBackend(object):
    def authenticate(self, request, username=None, password=None):
        if '@' in username:
            username = username.lower()

        try:
            user = CustomUser.objects.get(email=username)
            if user.check_password(password):
                return user
            return None
        except CustomUser.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return CustomUser.objects.get(pk=user_id)
        except CustomUser.DoesNotExist:
            return None
