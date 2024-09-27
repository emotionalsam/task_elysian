from pydantic import BaseModel, EmailStr
from bson import ObjectId
from typing import Optional

# A utility function to convert ObjectId to str
def objectid_to_str(oid: ObjectId) -> str:
    return str(oid)

class UserIn(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    email: EmailStr
    userID: Optional[str] 
    
