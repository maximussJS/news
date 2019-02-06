from aiohttp.web import View, RouteTableDef, json_response
from aiohttp_cors import CorsViewMixin
from cloudinary import config
from cloudinary.uploader import upload as save
from config import CLOUD_NAME, API_KEY, API_SECRET
from utils.decorators import authorize
from utils.responses import success_response, failure_response, server_error_response


upload = RouteTableDef()


config(cloud_name=CLOUD_NAME, api_key=API_KEY, api_secret=API_SECRET)


@upload.view('/upload')
class Upload(View, CorsViewMixin):

    @authorize
    async def post(self) -> json_response:
        try:
            form_data = await self.request.post()
            file = form_data['file'].file
            if file is None:
                return failure_response(400, 'You did not send file')
            result = save(file=file)
            return success_response(200, 'OK', data=result['url'])
        except Exception as e:
            return server_error_response(e)
