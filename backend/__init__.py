#!/usr/bin/env python3

from backend.storage.engine.db import Database

db = Database()
db.connect()


def to_dict(obj):
    """
    Takes an object and convert it into a dict
    """
    dic = obj.__dict__
    if "_sa_instance_state" in dic:
        del dic["_sa_instance_state"]
    return dic
