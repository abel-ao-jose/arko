'''owrkspace main page'''
from flask import render_template
from flask.views import View

class Editor(View):
    '''Editor class'''

    def dispatch_request(self):
        return render_template('editor/workspace.html')
