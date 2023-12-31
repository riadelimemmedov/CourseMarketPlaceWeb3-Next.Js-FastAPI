#

#!Tortoise
from tortoise.contrib.pydantic import pydantic_model_creator
from pydantic import BaseModel, PositiveFloat, PositiveInt


#!Database models
from models.course import Category, Wsl, Course
from models.profile import Profile


#!Python modules and functions
from typing import Optional, Any


#!Schemas
from schemas.profile import ProfileOutSchema
from schemas.category import CategoryOutSchema


# ?Pydantic model instance
WslInSchema = pydantic_model_creator(Wsl, name="WslIn", exclude_readonly=True)
WslOutSchema = pydantic_model_creator(Wsl, name="Wsl")
CourseInSchema = pydantic_model_creator(
    Course,
    name="CourseIn",
    exclude_readonly=True,
    exclude=["slug", "author_id", "category_id", "wsl_id"],
)
CourseBaseSchema = pydantic_model_creator(
    Course, name="Course", exclude=["modified_at",'author.password']
)


# *CourseOutSchema
class CourseOutSchema(CourseBaseSchema):
    author: pydantic_model_creator(Profile,name='CourseProfileOutSchema',exclude=["date_joined", "modified_at",'password'])
    category: pydantic_model_creator(Category, name="CourseCategoryOutSchema")


# *UpdateCourse
class UpdateCourse(BaseModel):
    course_type: Optional[str]
    title: Optional[str]
    description: Optional[str]
    cover_image: Optional[str]
    wsl : Optional[str]
    price: Optional[PositiveFloat]
    author: Optional[PositiveInt]  # ForeignKey
    category: Optional[PositiveInt]  # ForeignKey
