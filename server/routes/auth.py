from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import EmailStr
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from utils import auth_utils
from database import create_user, get_user_by_email
from models.user import UserIn
from datetime import timedelta
from jose import JWTError, jwt

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


@router.post("/register")
async def register(user: UserIn):

    existing_user = await get_user_by_email(user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email is already registered")
    
 
    hashed_password = auth_utils.get_password_hash(user.password)
    user_data = {
        "email": user.email,
        "hashed_password": hashed_password,
    }

   
    new_user = await create_user(user_data)
    
    user_data = {
        "email": new_user["email"],
        "userID": new_user["id"]
    }
    return {"msg": "User registered successfully"}


@router.post("/login")
async def login(user: UserIn):
    existing_user = await get_user_by_email(user.email) 
    if existing_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    if not auth_utils.verify_password(user.password, existing_user["hashed_password"]):
        raise HTTPException(status_code=403, detail="Incorrect password")

    access_token_expires = timedelta(minutes=auth_utils.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth_utils.create_access_token(
        data={"sub": existing_user["email"]}, expires_delta=access_token_expires
    )

    user_data = {
        "email": existing_user["email"],
        "userID": existing_user["id"]
    }
    return {"access_token": access_token, "token_type": "bearer", "user": user_data}
    


@router.get("/me")
async def read_users_me(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, auth_utils.SECRET_KEY, algorithms=[auth_utils.ALGORITHM])
        user = await get_user_by_email(payload["sub"])
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        user_data = {
            "email": user["email"],
            "userID": user["id"]
        }
        return user_data
    except JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")