import pickle
import numpy as np

pivot_table = pickle.load(open("models/pivot_table.pkl", "rb"))
similarity_scores = pickle.load(open("models/similarity_scores.pkl", "rb"))
books_df = pickle.load(open("models/books_df.pkl", "rb"))


def recommendFor(book_name, top=5):
    """
    return top n similar books based on collaborative filtering
    param
        - book_name: name of the book
        - top: number of books to return (default: 5) NOTE : no edge case handling, better to use default value
    """
    if book_name not in pivot_table.index:
        return []
    index = np.where(pivot_table.index == book_name)[0][0]
    similar_items = sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[1 : 1 + top]

    results = []
    for i in similar_items:
        item = {}
        temp_df = books_df[books_df["Book-Title"] == pivot_table.index[i[0]]]
        item["book_name"] = temp_df.drop_duplicates("Book-Title")["Book-Title"].values[0]
        item["book_author"] = temp_df.drop_duplicates("Book-Title")["Book-Author"].values[0]
        item["thumbnail"] = temp_df.drop_duplicates("Book-Title")["Image-URL-M"].values[0]

        results.append(item)

    return results