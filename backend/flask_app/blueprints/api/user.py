#!/usr/bin/env python3

"""
Blueprint for the users route
"""

from flask import jsonify, abort, request
from backend.flask_app.blueprints.api.main import api_blueprint
from backend.storage.tables.user import User
from backend import db, to_dict
from uuid import uuid4


@api_blueprint.route("/users", methods=["GET"])
def users_get():
    """
    Route that fetches a user whose details match the provided request data
    """
    #username = request.args.get("username")
    password = request.args.get("password")
    email = request.args.get("email")
    if None in [password, email]:
        abort(400, description="Incomplete login credentials")

    u_objects = db.get_table(User)
    if u_objects is None:
        abort(500, description="The database has encountered an error, please try again")

    user = {}
    for user_obj in u_objects:
        user_dict = to_dict(user_obj)
        password_ = user_dict.get("password")
        email_ = user_dict.get("email")
        if password == password_ and email == email_:
            user = user_dict
            del user["password"]
            break

    if len(user) == 0:
        abort(404, description="User not found")
    
    res = jsonify({"user": user})
    res.status_code = 200
    return res

@api_blueprint.route("/users/<string:id>", methods=["GET"])
def users_get_by_id(id):
    """
    Route that fetches a user whose id matches the provided id
    """
    user = db.get_row(User, str(id))
    if user is None:
        abort(500, description="The database has encountered an error, please tr  y again")
    if not user:
        abort(404, description="No user matches the provided id")

    user = to_dict(user)
    if "password" in user:
        del user["password"]
    res = jsonify({"user": user})
    res.status_code = 200
    return res


@api_blueprint.route("/users", methods=["POST"])
def users_post():
    """
    Route that adds a user to the database
    """
    data = request.get_json()
    if not data:
        abort(400, description="Provided data not a JSON type")

    if "name" not in data:
        abort(400, description="Name missing")
    if "email" not in data:
        abort(400, description="Email missing")
    if "password" not in data:
        abort(400, description="Password missing")

    d_name = data.get("name")
    d_email = data.get("email")
    d_password = data.get("password")

    allUsers = db.get_table(User);
    for user in allUsers:
        if user.email == d_email:
            abort(409, description="User with the email exists")

    new_user = User(id=str(uuid4()), name=d_name, email=d_email, password=d_password)
    response = db.add(new_user)

    if response["data_added"] is False:
        abort(500, description="The database has encountered an error, please try again")

    new_user = to_dict(db.get_row(User, new_user.id))
    del new_user["password"]

    res = jsonify({"user": new_user})
    res.status_code = 200
    return res
