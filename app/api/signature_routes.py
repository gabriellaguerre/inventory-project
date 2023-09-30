from flask import Blueprint, request
from app.models import db
from werkzeug.utils import secure_filename
from flask_login import login_required, current_user


signature_routes = Blueprint('signatures', __name__)

@signature_routes.route('', methods=['POST'])
# @login_required
def save_signature():
    print('OOOOOOOOOOOOOOOOOOOO')
#     signature_image = request.files['signatureImage']
#     if signature_image:
#         filename = secure_filename(signature_image.filename)
#         signature_image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

#         # Record the image information in the database
#         new_signature = Signature(filename=filename)
#         db.session.add(new_signature)
#         db.session.commit()



    return {'message': 'success'}
    #return {'message': 'error'}
