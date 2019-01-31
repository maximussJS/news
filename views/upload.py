from aiohttp.web import View, RouteTableDef, json_response
from aiohttp_cors import CorsViewMixin
from cloudinary import config
from cloudinary.uploader import upload as save
from config import CLOUD_NAME, API_KEY, API_SECRET
from utils.helpers import is_valid_token
from utils.responses import success_response, failure_response, server_error_response


upload = RouteTableDef()


config(cloud_name=CLOUD_NAME, api_key=API_KEY, api_secret=API_SECRET)


@upload.view('/upload')
class Upload(View, CorsViewMixin):
    async def post(self) -> json_response:
        try:
            if 'Authorization' in self.request.headers:
                token = self.request.headers['Authorization']
                if token is not None and is_valid_token(token):
                    form_data = await self.request.post()
                    file = form_data['file'].file
                    if file is not None:
                        result = save(file=file)
                        return success_response(200, 'OK', data=result['url'])
                    return failure_response(400, 'You did not send file')
                return failure_response(401, 'Login please')
            return failure_response(401, 'Login please')
        except Exception as e:
            return server_error_response(e)
