from flask import render_template

from . import esap


@esap.route("/")
def esap_index():
    return render_template("esap/index.html")


@esap.route("/about")
def esap_about():
    return "Hello, Esap About!"
