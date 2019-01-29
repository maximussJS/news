from aiohttp.web import json_response, Response


def response(code: int, text: str) -> Response:
    r = Response(status=code, text=text)
    return r


def success_response(code: int, text: str, data=None, token=None) -> json_response:
    if data is not None:
        return json_response(dict(success=True, data=data, text=text), status=code)
    elif token is not None:
        return json_response(dict(success=True, token=str(token, 'utf-8'), text=text), status=code)
    else:
        return json_response(dict(success=True, text=text), status=code)


def failure_response(code: int, text: str) -> json_response:
    return json_response(dict(success=False, text=text), status=code)


def server_error_response(error: str) -> json_response:
    print(error)
    return json_response(dict(success=False, text='Something went wrong...'), status=500)
