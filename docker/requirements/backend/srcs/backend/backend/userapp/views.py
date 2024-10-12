from django.http import HttpResponse, JsonResponse


def index(request):
	json = {"message": "This is index view"}
	return JsonResponse(json)
	# return HttpResponse("This is index view")