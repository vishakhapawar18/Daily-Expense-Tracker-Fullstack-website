from django.contrib import admin
from .models import userDetails, Expense

# Register your models here.
admin.site.register(userDetails)
admin.site.register(Expense)
