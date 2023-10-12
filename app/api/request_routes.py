import base64
import io
import math
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Request, Item, RequestItems, db
from app.forms import RequestItemForm
from datetime import datetime
from app.api.aws_helper_sig import upload_file_to_s3, get_unique_filename

request_routes = Blueprint('requests', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# ------------------------------GET REQUESTS PAGINATION------------------------
@request_routes.route('/<int:page>')
# @login_required
def get_requests_by_page(page):
    requests = Request.query.all()
    requests.reverse()

    limit = 5
    offset = ((page + 1) * limit)
    startIndex = page * 5

    total_pages = math.ceil(len(requests)/limit)

    return {'requests': [request.to_dict() for request in requests[startIndex:offset]], 'total_pages': total_pages }

# ------------------------------GET REQUESTS------------------------
@request_routes.route('/')
# @login_required
def get_requests():
    requests = Request.query.all()
    return {'requests': [request.to_dict() for request in requests]}


# ------------------------------GET ONE REQUEST------------------------
@request_routes.route('/<int:requestId>')
# @login_required
def get_a_request(requestId):
    request = Request.query.get(requestId)
    return request.to_dict()


#------------------------------CREATE REQUEST------------------------
@request_routes.route('', methods=['POST'])
# @login_required
def create_request():

        # Get the image data as a base64 string
    image_data = request.form['image']

    if (image_data):
        #Decode the base64-encoded image data into bytes
        image_bytes = base64.b64decode(image_data)

        # Generate a unique filename for the image
        filename = get_unique_filename('image.png')

        # Create a file-like object from the image bytes
        image_file = io.BytesIO(image_bytes)
        image_file.filename = filename
        image_file.content_type = 'image/png'

        # Upload the image to S3
        upload = upload_file_to_s3(image_file)

        if "url" not in upload:
            return validation_errors_to_error_messages(upload)

        url = upload["url"]
        request1 = Request(voided = False,
                          userId = current_user.id,
                          image = url)
        db.session.add(request1)
        db.session.commit()


        return request1.to_dict()
    return {'message': 'something went wrong'}

# ------------------------------------EDIT REQUEST------------------------
@request_routes.route('/<int:requestId>', methods=['PUT'])
# @login_required
def edit_request(requestId):
    request = Request.query.get(requestId)
    request.voided = True
    request.updatedAt = datetime.now()
    db.session.commit()

    return request.to_dict()
