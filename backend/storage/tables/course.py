#!/usr/bin/env python3

"""
Course TABLE declaration for our database
"""

from sqlalchemy import Column, Integer, String
from user import Base
from sqlalchemy.orm import Relationship
from uuid import uuid4


class Course(Base):
    """
    Declaration of Course class or table
    """
    __tablename__ = 'courses'
    title = Column(String, unique=True, nullable=False)
    id = Column(String, primary_key=True, default=str(uuid4()), unique=True)
    image_url = Column(String, nullable=False)
    decription = Column(String, default="No description set for this course")
    likes = Column(Integer, default=0)
    categories = Column(String, nullable=False)
    query_link = Column(String, nullable=False)

    # Declaring relationships
    reviews = Relationship('Review', back_populates="course")
