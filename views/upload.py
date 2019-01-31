from aiohttp.web import View, RouteTableDef, json_response
from aiohttp_cors import CorsViewMixin
from cloudinary import config
from cloudinary.uploader import upload as save
from utils.responses import success_response, failure_response, server_error_response
from config import CLOUD_NAME, API_KEY, API_SECRET


upload = RouteTableDef()


config(cloud_name=CLOUD_NAME, api_key=API_KEY, api_secret=API_SECRET)


@upload.view('/upload')
class Upload(View, CorsViewMixin):
    async def post(self) -> json_response:
        form_data = await self.request.post()
        result = save(file=form_data['file'].file)
        print(result)
        return success_response(200, 'OK')
