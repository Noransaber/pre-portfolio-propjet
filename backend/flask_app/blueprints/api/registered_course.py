#!/usr/bin/env python3

"""
Blueprint for the registered_courses routes
"""

from flask import jsonify, abort, request
from backend.flask_app.blueprints.api.main import api_blueprint
from backend.storage.tables.registered_course import Registered
from backend.storage.tables.course import Course
from backend.storage.tables.user import User
from backend import db, to_dict


@api_blueprint.route("/registered", methods=["GET"])
def registered_get():
    """
    Routes that get list of registered courses by a specified user
    """
    user_id = request.args.get("user_id")
    if not user_id:
        abort(400, description="No user_id provided")

    r_objects = db.get_table(Registered)
    if r_objects is None:
        abort(500, description="The database has encountered an error, please tr      y again")

    registered_c = []
    for r_obj in r_objects:
        r_dict = to_dict(r_obj)
        db_user_id = r_dict.get("user_id")
        if user_id == db_user_id:
            registered_c.append(r_dict)

    if len(registered_c) == 0:
        abort(404, description="No registered courses found")

    res = jsonify({"registered_courses": registered_c})
    res.status_code = 200
    return res


@api_blueprint.route("/registered", methods=["POST"])
def registered_post():
    """
    Route that adds to the list of registered courses of a user
    """
    data = request.get_json()
    if not data:
        abort(400, description="Provided data not a JSON type")

    if "course_id" not in data:
        abort(400, description="Course id missing")
    if "user_id" not in data:
        abort(400, description="User id missing")
    if "course_title" not in data:
        abort(400, description="Course title missing")

    d_course_id = data.get("course_id")
    d_user_id = data.get("user_id")
    d_course_title = data.get("course_title")

    course_user = [
            (d_course_id, Course),
            (d_user_id, User)
            ]
    for param in course_user:
        if len(db.get_row(param[1], param[0])) == 0:
            des = "No {} linked to the provided id".format(param[1].__name__)
            abort(400, description=des)
        if db.get_row(param[1], param[0]) is None:
            des = "Internal database problem, try again"
            abort(500, description=des)

    new_registered_course = Registered(
            course_title=d_course_title,
            course_id=d_course_id,
            user_id=d_user_id
            )
    response = db.new(new_registered_course)

    if response["data_added"] is False:
        abort(500, description="The database has encountered an error, please try again")

    new_registered_course = to_dict(new_registered_course)

    res = jsonify({"registered_course": new_registered_course})
    res.status_code = 200
    return res