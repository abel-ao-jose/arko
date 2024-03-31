"""workspace blueprint"""

from flask import Blueprint
from .editor import Editor

editor = Blueprint(
    "editor",
    __name__,
    url_prefix="/arko",
    template_folder="templates",
    static_folder="static",
    static_url_path="editor/",
)

editor.add_url_rule("/editor", view_func=Editor.as_view("editor"))
