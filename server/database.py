from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = "mongodb+srv://elysiandb:a1b2c3d4@cluster0.au7m5.mongodb.net/elysian?retryWrites=true&w=majority&appName=Cluster0"

client = AsyncIOMotorClient(MONGO_URI)
database = client.elysian
users_collection = database["users"]

def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "email": user["email"],
        "hashed_password": user["hashed_password"],
    }


async def get_user_by_email(email: str):
    user = await users_collection.find_one({"email": email})
    return user_helper(user) if user is not None else None


async def create_user(user_data: dict):
    new_user = await users_collection.insert_one(user_data)
    return user_helper(await users_collection.find_one({"_id": new_user.inserted_id}))
