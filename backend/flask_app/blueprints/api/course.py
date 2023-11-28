#!/usr/bin/env python3

"""
Blueprint for the available courses route
"""

from flask import jsonify, abort
from backend.flask_app.blueprints.api.main import api_blueprint
from backend.storage.tables.course import Course
from backend import db


@api_blueprint.route("/courses")
def courses():
    c_objects = db.get_table(Course)
    if not c_objects:
        abort(500, description="The database has encountered an error, please try again")

    courses = []
    for course in c_objects:
        course_dict = course.__dict__
        if "_sa_instance_state" in course_dict:
            del course_dict["_sa_instance_state"]
        courses.append(course_dict)

    res = jsonify({"courses": courses})
    res.status_code = 200
    return res

@api_blueprint.route("/courses/<id>")
def course(id):
    c_objects = db.get_table(Course)
    if not c_objects:
        abort(500, description="The database has encountered an error, please try again")

    data = {}
    for course in c_objects:
        course_dict = course.__dict__
        if "_sa_instance_state" in course_dict:
            del course_dict["_sa_instance_state"]
        if str(course_dict.get("id")) == str(id):
            data = course_dict
            break

    res = jsonify({"course": data})
    res.status_code = 200
    return res
