from typing import Union
from fastapi import FastAPI
import uvicorn
import argparse
from functools import lru_cache

from src.popularity_recommender import popular_books_top

import config

app = FastAPI()


@lru_cache()
def get_settings():
    return config.Settings()


@app.get("/info")
def read_root():
    return {"message": f"Hello from {get_settings().backend_name}"}


@app.get("/search/{query}")
def search_book(query: str, top: Union[int, None] = 10):
    return {"message": f"searching for {query}"}


@app.get("/popular/{limit}")
def get_popular(limit: int):
    return popular_books_top(limit)


@app.post("/recommend/{book_name}")
def get_recommended():
    return {"message": "recommended books"}


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
            env_file="./config/.env.dev",
            workers=workers,
        )
    else:
        uvicorn.run(
            "app:app",
            host=host,
            port=port,
            env_file="./config/.env.prod",
            workers=workers,
        )
