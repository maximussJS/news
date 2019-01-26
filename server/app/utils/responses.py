from flask import jsonify


def success_response(message, code, data=None):
    if data is not None:
        return jsonify(success=True, data=data, message=message), code
    return jsonify(success=True, message=message), code


def failure_response(message, code):
    return jsonify(success=False, message=message), code


def server_error_response(error):
    print(error)
    return jsonify(success=False, message='Internal Server Error'), 500
