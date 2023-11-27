#!/usr/bin/env python3

"""
Blueprint for the available courses route
"""

from flask import jsonify
from backend.flask_app.blueprints.api.main import api_blueprint
from backend.storage.tables.user import Course
from backend import db


@api_blueprint.route("/courses")
def courses():
    c_objects = db.get_table(Course)
    courses = []
    for course in c_objects:
        course_dict = course.__dict__
        if "_sa_instance_state" in course_dict:
            del course_dict["_sa_instance_state"]
        courses.append(course_dict)
    return jsonify(courses)

@api_blueprint.route("/courses/<id>")
def course(id):
    c_objects = db.get_table(Course)
    data = {}
    for course in c_objects:                                                   
        course_dict = course.__dict__
        if "_sa_instance_state" in course_dict:
            del course_dict["_sa_instance_state"]
        if str(course_dict["id"]) == str(id):
            data = course_dict
    return jsonify(data)

