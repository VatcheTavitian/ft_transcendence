from rest_framework import serializers
from .models import MatchHistory, TournamentsWon


class MatchHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MatchHistory
        fields = "__all__"


class TournamentsWonSerializer(serializers.ModelSerializer):
    class Meta:
        model = TournamentsWon
        fields = "__all__"
