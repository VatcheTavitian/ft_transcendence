from django.shortcuts import render, HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import MatchHistory
from .serializers import MatchHistorySerializer

# Create your views here.
def test(request):
	return HttpResponse("This is test view for backend micro")

class AddMatch(APIView):
	def post(self, request):
		player1 = request.POST.get('player1')
		player2 = request.POST.get('player2')
		player1_score = request.POST.get('player1_score')
		player2_score = request.POST.get('player2_score')
		if player1_score > player2_score:
			winner = player1
		if player1_score == player2_score:
			winner = 'draw'
		else:
			winner = player2
		match = MatchHistory.objects.create(player1=player1, player2=player2, winner=winner, player1_score=player1_score, player2_score=player2_score)
		serializer = MatchHistorySerializer(match, many=False)
		return Response(serializer.data)
	

class GetAllScores(APIView):
	def get(self, request):
		matches = MatchHistory.objects.all()
		serializer = MatchHistorySerializer(matches, many=True)
		return Response(serializer.data)
	
class GetPlayerScores(APIView):
	def get(self, request):
		player = request.GET.get('player')
		matches = MatchHistory.objects.filter(player1=player) | MatchHistory.objects.filter(player2=player)
		serializer = MatchHistorySerializer(matches, many=True)
		return Response(serializer.data)
	
class UpdatePlayerName(APIView):
	def post(self, request):
		player = request.POST.get('player')
		new_name = request.POST.get('new_name')
		matches = MatchHistory.objects.filter(player1=player)
		for match in matches:
			match.player1 = new_name
			match.save()
		matches = MatchHistory.objects.filter(player2=player)
		for match in matches:
			match.player2 = new_name
			match.save()
		return Response({'success' : "Player name updated successfully"})
		
