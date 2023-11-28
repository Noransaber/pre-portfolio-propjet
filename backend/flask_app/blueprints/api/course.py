#!/usr/bin/env python3

"""
Blueprint for the available courses route
"""

from flask import jsonify, abort
from backend.flask_app.blueprints.api.main import api_blueprint
from backend.storage.tables.course import Course
from backend import db, to_dict


@api_blueprint.route("/courses")
def courses():
    c_objects = db.get_table(Course)
    if c_objects is None:
        abort(500, description="The database has encountered an error, please try again")
    if not c_objects:
        abort(404, description="No course found")

    courses = []
    for course in c_objects:
        reviews = [to_dict(review) for review in course.reviews]
        course_dict = to_dict(course)
        course_dict["reviews"] = reviews
        courses.append(course_dict)

    res = jsonify({"courses": courses})
    res.status_code = 200
    return res

@api_blueprint.route("/courses/<title>")
def course(title):
    c_objects = db.get_table(Course)
    if c_objects is None:
        abort(500, description="The database has encountered an error, please try again")

    data = {}
    for course in c_objects:
        reviews = [to_dict(review) for review in course.reviews]
        course_dict = to_dict(course)
        course_dict["reviews"] = reviews
        if str(course_dict.get("course_title")) == str(title):
            data = course_dict
            break
    if not data:
        abort(404, description="Course '{}' not found".format(id))

    res = jsonify({"course": data})
    res.status_code = 200
    return res
