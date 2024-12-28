from django.db import models

# Create your models here.

class MatchHistory(models.Model):
	id = models.AutoField(primary_key=True)
	player1 = models.CharField(max_length=40, null=False)
	player2 = models.CharField(max_length=40, null=False)
	winner = models.CharField(max_length=40, null=False)
	match_date = models.DateTimeField(auto_now_add=True)
	player1_score = models.IntegerField(null=False)
	player2_score = models.IntegerField(null=False)

class TournamentsWon(models.Model):
	id = models.AutoField(primary_key=True)
	player = models.CharField(max_length=40, null=False)
	won = models.IntegerField(null=False, default=0)
