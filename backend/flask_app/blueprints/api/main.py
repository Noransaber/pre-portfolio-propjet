#!/usr/bin/env python3

"""
Source for all api blueprints
"""

from flask import Blueprint

api_blueprint = Blueprint("apis", __name__, url_prefix="/api")

from .course import courses
