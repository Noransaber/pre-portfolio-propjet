#!/usr/bin/env python3

"""
Review TABLE declaration for our database
"""

from datetime import datetime
from sqlalchemy import Column, DateTime, ForeignKey, String
from user import Base
from sqlalchemy.orm import Relationship
from uuid import uuid4


class Review(Base):
    """
    Declaration of Review class or table
    """
    __tablename__ = 'reviews'
    id = Column(String, primary_key=True, default=str(uuid4()), unique=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    course_id = Column(String, ForeignKey("courses.id"), nullable=False)
    message = Column(String, default="(null)")
    date_time = Column(DateTime, default=datetime.utcnow())

    # Declaring relationships
    course = Relationship('Course', back_populates="reviews")
