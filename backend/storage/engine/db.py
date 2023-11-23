#!/usr/bin/env python3

"""
The engine for managing ourn database data
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from storage.tables.user import Base, User
from storage.tables.course import Course
from storage.tables.interest import Interest
from storage.tables.registered_course import Registered
from storage.tables.review import Review


class Database:
    """
    A class that defines all the attributes and methods that 
    manage the database data
    """

    def __init__(self):
        """
        Inits
        """
        self.__session = None

    def connect(self):
        try:
            sql_url = "mysql://i-am:Moneyyear*1@localhost/skillhub_data"
            engine = create_engine(sql_url)
        except Exception as err:
            print(f"An error occured connecting to your DB: {err}")
        else:
            Base.metadata.create_all(engine)
            Session = sessionmaker(bind=engine)
            session = scoped_session(Session)
            self.__session = session

    def 
