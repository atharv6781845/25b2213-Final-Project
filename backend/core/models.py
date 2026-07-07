from django.db import models

# Create your models here.
class Doctor(models.Model):
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    availability_days = models.CharField(max_length=100)
    availability_time = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.name} - {self.specialization} - {self.availability_days} - {self.availability_time}'

class Appointment(models.Model):
    patient_name = models.CharField(max_length=100)
    patient_email = models.EmailField()
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    date = models.DateField()
    time_slot = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.patient_name} with {self.doctor.name}"