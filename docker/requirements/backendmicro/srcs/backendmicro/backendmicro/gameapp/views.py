from django.shortcuts import render, HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import MatchHistory, TournamentsWon
from django.db.models import F
from .serializers import MatchHistorySerializer, TournamentsWonSerializer
from rest_framework.permissions import AllowAny
from django.http import JsonResponse


def test(request):
	return HttpResponse("This is test view for backend micro")

class AddMatch(APIView):
	permission_classes = [AllowAny]
	def post(self, request):
		try:
			player1 = request.POST.get('player1')
			player2 = request.POST.get('player2')
			player1_score = request.POST.get('player1_score')
			player2_score = request.POST.get('player2_score')
			if player1 == None or player2 == None or int(player1_score) < 0 or int(player2_score) < 0:
				return Response({'error' : "Invalid data"})
			if player1_score > player2_score:
				winner = player1
			elif player1_score == player2_score:
				winner = 'draw'
			else:
				winner = player2
			match = MatchHistory.objects.create(player1=player1, player2=player2, winner=winner, player1_score=player1_score, player2_score=player2_score)
			serializer = MatchHistorySerializer(match, many=False)
			return Response(serializer.data)
		except:
			return JsonResponse({'error': 'Internal Server Error'}, status=500)
	

class GetAllScores(APIView):
	permission_classes = [AllowAny]
	def get(self, request):
		try:
			matches = MatchHistory.objects.all()
			serializer = MatchHistorySerializer(matches, many=True)
			return Response(serializer.data)
		except:
			return JsonResponse({'error': 'Internal Server Error'}, status=500)

class GetPlayerScores(APIView):
	permission_classes = [AllowAny]
	def get(self, request):
		try:
			player = request.GET.get('player')
			matches = MatchHistory.objects.filter(player1=player) | MatchHistory.objects.filter(player2=player)
			if not matches:
				return JsonResponse({'error': 'player has not had any matches'})
			serializer = MatchHistorySerializer(matches, many=True)
			return Response(serializer.data)
		except:
			return JsonResponse({'error': 'Internal Server Error'}, status=500)
	
class UpdatePlayerName(APIView):
	permission_classes = [AllowAny]
	def post(self, request):
		try:
			if (request.POST.get('player') == None or request.POST.get('new_name') == None):
				return Response({'error' : "Invalid data"})
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
		except:
			return JsonResponse({'error': 'Internal Server Error'}, status=500)

class UpdateTournamentsWon(APIView):
	permission_classes = [AllowAny]
	def get(self, request):
		try:
			player = request.GET.get('player')
			won = TournamentsWon.objects.filter(player=player).first()
			if won:
				serializer = TournamentsWonSerializer(won, many=False)
				return Response(serializer.data)
			return JsonResponse({'error':'player has not won a tournament'})
		except:
			return JsonResponse({'error': 'Internal Server Error'}, status=500)
	def post(self, request):
		try:
			player = request.POST.get('player')
			won = TournamentsWon.objects.filter(player=player).first()
			if not won:
				TournamentsWon.objects.create(player=player)
			else:
				won.won = F('won') + 1
				won.save()
			won = TournamentsWon.objects.filter(player=player).first()
			serializer = TournamentsWonSerializer(won, many=False)
			return Response(serializer.data)
		except:
			return JsonResponse({'error': 'Internal Server Error'}, status=500)
