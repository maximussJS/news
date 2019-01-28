from flask import jsonify
from .helpers import cross_domain


@cross_domain(origin='localhost', headers=['access-control-allow-origin', 'Content-Type'])
def success_response(message, code, data=None, token=None):
    if token is not None:
        return jsonify(success=True, message=message, token=token), code
    if data is not None:
        return jsonify(success=True, message=message, data=data), code
    return jsonify(success=True, message=message), code


@cross_domain(origin='localhost', headers=['access-control-allow-origin', 'Content-Type'])
def failure_response(message, code):
    return jsonify(success=False, message=message), code


@cross_domain(origin='localhost', headers=['access-control-allow-origin', 'Content-Type'])
def server_error_response(error):
    print(error)
    return jsonify(success=False, message='Internal Server Error'), 500
