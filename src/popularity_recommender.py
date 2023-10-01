import pickle

popularity_df = pickle.load(open("models/popular.pkl", "rb"))
MAX_RECOMMENDATIONS = popularity_df.shape[0]


def popular_books_top(top: int):
    if top > MAX_RECOMMENDATIONS:
        top = MAX_RECOMMENDATIONS
    elif top < 0:
        top = 0
    df = popularity_df[["Book-Title", "Book-Author", "Image-URL-M"]]
    return df.head(top).to_dict(orient="records")
