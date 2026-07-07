from django.shortcuts import render

# Create your views here.

from rest_framework import generics
from .models import Doctor, Appointment
from .serializers import DoctorSerializer, AppointmentSerializer

class DoctorList(generics.ListCreateAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class AppointmentCreate(generics.ListCreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer