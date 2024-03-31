""" Applicatioon """
from flask import Flask



def create_app():
    """ App Factury. """
    app = Flask(__name__)

    from .pages.home import home
    app.register_blueprint(home)

    from .pages.arko import editor
    app.register_blueprint(editor)

    return app
