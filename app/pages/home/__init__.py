"""Home page blueprint"""

from flask import Blueprint

home = Blueprint(
    "home",
    __name__,
    static_folder="static",
    url_prefix="/",
    static_url_path="/home/static",
    template_folder="templates",
)

from .index import Index
home.add_url_rule("/", view_func=Index.as_view("index"))
