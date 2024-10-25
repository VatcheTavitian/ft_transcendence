from django.http import JsonResponse
from random import randint

def input_validation(*args):
	not_allowed = ['<', '>', '\'', '"', '&']
	for arg in args:
		for na in not_allowed:
			if na in arg:
				return False

def sanitize_input(input):
	not_allowed = ['<', '>', '\'', '"', '&', ';', '|', '&&', '||' , '`', '$', '(', ')', '[', ']', '{', '}', '\\', '\n', '\t', '\r', '\0', '\x00', '\x1a']
	for x in not_allowed:
		input = input.replace(x, '')
	return input


def password_policy(password):
	if len(password) < 8:
		return False
	if not any(char.isdigit() for char in password):
		return False
	if not any(char.isupper() for char in password):
		return False
	if not any(char.islower() for char in password):
		return False
	if  not any(not char.isdigit() and not char.isalpha() for char in password):
		return False
	
def generate_random_filename(username, imagename):
	lower_bound = 10 ** 6
	upper_bound = 10 ** 7
	random_suffix = randint(lower_bound,upper_bound)
	last = imagename.rfind(".")
	extension = "" 
	if last != -1:
		extension = imagename[last:]
	return (username + f"{random_suffix}" + extension)
