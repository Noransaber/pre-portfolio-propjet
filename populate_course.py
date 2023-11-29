#!/usr/bin/env python3

from uuid import uuid4
from dotenv import load_dotenv
from os import getenv
import time
from requests import get
from backend import db
from backend.storage.tables.course import Course
from backend.storage.tables.video import Video



load_dotenv()

query = input("Query=> ")
description = input("Description=> ")
popular = int(input("Popular (1/0)=> "))

if popular not in [0, 1]:
    print("Wrong popular choice, retry again")
    exit()

endpoint = "https://api.vimeo.com/videos"
key = getenv("API_KEY")

headers = {
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json"
        }

params = {
        "query": query
        }

response = get(endpoint, headers=headers, params=params)

res = response.json()
response_data = res["data"]

new_course = Course(
        title=query,
        image_url=response_data[0]['pictures']['sizes'][-1]['link'],
        description=description,
        id=str(uuid4()),
        is_popular=True if popular == 1 else False
        )
res = db.add(new_course)
print(res)
print()

# Extracting information for the first video
for video in response_data:
    # Extracting details
    title = video['name']
    html_embed_code = video['embed']['html']

    new_video = Video(
            title=title,
            id=str(uuid4()),
            course_id=new_course.id,
            embed_link=html_embed_code
            )

    new_video.course = db.get_row(Course, new_course.id)
    res = db.add(new_video)
    print(title)
    print(res)
    time.sleep(1)
