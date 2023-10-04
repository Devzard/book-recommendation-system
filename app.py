from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import argparse
from functools import lru_cache
from pydantic import BaseModel

from src.popularity_recommender import popular_books_top
from src.collaborative_recommender import recommendFor
from src.search import search_book

import config

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Book(BaseModel):
    name: str


@lru_cache()
def get_settings():
    return config.Settings()


@app.get("/hello")
def read_hello():
    return {"message": f"Hello from {get_settings().backend_name}"}


@app.get("/search/{book_name}")
async def search_book_name(book_name: str = ""):
    return search_book(book_name)


@app.get("/popular/{limit}")
async def get_popular(limit: int):
    return popular_books_top(limit)


@app.post("/recommend")
async def get_recommended(book: Book):
    print(book.name)
    recommendation_on = search_book(book.name, 1)[0]
    return {'book': recommendation_on, 'recommendation': recommendFor(book.name)}



if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Book Recommender API")
    parser.add_argument("-e", "--env", default="dev")
    parser.add_argument("-w", "--workers", default=1, type=int)
    args = parser.parse_args()
    host = get_settings().backend_host
    port = get_settings().backend_port
    workers = args.workers

    if args.env == "dev":
        uvicorn.run(
            "app:app",
            host=host,
            port=port,
            reload=True,
            env_file="./config/.env.dev"
        )
    else:
        uvicorn.run(
            "app:app",
            host=host,
            port=port,
            env_file="./config/.env.prod",
            workers=workers,
        )
