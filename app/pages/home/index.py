"""index page"""
from flask import render_template
from flask.views import View

class Index(View):
    '''index page'''
    methods=['get']
    def __init__(self) -> None:
        ...

    def dispatch_request(self):
        return render_template('home/index.html')
