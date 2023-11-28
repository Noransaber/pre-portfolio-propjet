#!/usr/bin/env python3

"""
Blueprint for the registered_courses route
"""

from flask import jsonify, abort, request
from backend.flask_app.blueprints.api.main import api_blueprint
from backend.storage.tables.registered_courses import Registered
from backend import db


@api_blueprint.route("/registered", methods=["GET"])
def registered_get():
    user_id = request.args.get("user_id")
    if not user_id:
        abort(400, description="No user_id provided")

    r_objects = db.get_table(Registered)
    if not r_objects:
        abort(500, description="The database has encountered an error, please tr      y again")

    registered_c = []
    for r_obj in r_objects:
        r_dict = r_obj.__dict__
        if "_sa_instance_state" in r_dict:
            del r_dict["_sa_instance_state"]
        db_user_id = r_dict.get("user_id")
        if user_id == db_user_id:
            registered_c.append(r_dict)

    if not registered_c:
        abort(404, description="No registered courses found")

    res = jsonify({"registered_courses": registered_c})
    res.status_code = 200
    return res


@api_blueprint.route("/registered", methods=["POST"])
def registered_post():
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

    new_registered_course = Registered(
            course_title=d_course_title,
            course_id=d_course_id,
            user_id=d_user_id
            )
    response = db.new(new_registered_course)

    if response["data_added"] is False:
        abort(500, description="The database has encountered an error, please try again")

    new_registered_course = new_registered_course.__dict__
    if "_sa_instance_state" in new_registered_course:
        del new_registered_course["_sa_instance_state"]

    res = jsonify({"registered_course": new_registered_course})
    res.status_code = 200
    return res
