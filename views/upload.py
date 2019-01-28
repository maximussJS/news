from flask import request
from flask import Blueprint
from config import Cloud
from cloudinary.uploader import upload as save
from cloudinary.utils import cloudinary_url
from utils.responses import success_response, failure_response, server_error_response


upload = Blueprint('Upload', __name__)


@upload.route('/', methods=['POST'])
def upload_on_cloudinary():
    file = request.files['file']
    if file:
        print(file)
        try:
            result = save(file)
            cloud_url = cloudinary_url(result['public_id'], width=300, height=300)
            print('result' + result)
            print('url' + cloud_url)
            return success_response('OK', 200)
        except Exception as e:
            return server_error_response(e)
    return failure_response('Failed to upload file', 400)
