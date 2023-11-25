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
from os import getenv
from dotenv import load_dotenv


class Database:
    """
    A class that defines all the attributes and methods that 
    manage the database data
    """

    def __init__(self):
        """
        Initializtions
        """
        self.__session = None

    def connect(self):
        """
        db methods that starts and connects to the database
        """
        connected = False
        try:
            #loadiing DDB details from environment data
            load_dotenv()
            user = getenv("DB_USER")
            password = getenv("DB_PASSWORD")
            database = getenv("DB_DATABASE")

            #Creating database engine
            db_url = "mysql://{}:{}@localhost/{}".format(
                    user,
                    password,
                    database)
            engine = create_engine(db_url)
        except Exception as err:
            print(f"An error occured connecting to your DB: {err}")
        else:
            Base.metadata.create_all(engine)
            Session = sessionmaker(bind=engine)
            session = scoped_session(Session)
            self.__session = session
            connected = True

    def add(self):
        """
        db method that 
