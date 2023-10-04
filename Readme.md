# Book Recommendation System with React UI
This is a simple recommendation system project that implements **popularity based** recommendation system and **collborative filtering system** to recommend books.

![demo_image_-1](https://github.com/Devzard/book-recommendation-system/assets/52529195/f16a5979-d288-4223-a8ca-79328e4510fd)

![demo image -2](https://github.com/Devzard/book-recommendation-system/assets/52529195/e9225345-d569-4e1f-9279-4df512e03a02)

![demo image -3](https://github.com/Devzard/book-recommendation-system/assets/52529195/d55248c0-c630-4420-881c-d03ac582d876)

## Steps to setup the project

### Setting up the backend
1. Create an python environment with python version = 3.11.5, for conda it will be :
    ```
        conda create --name book-recommendation python=3.11.5
    ```

2. Then activate the environment, for conda :
    ```
        conda activate book-recommendation
    ```

3. Install the dependencies using pip 
    ```
        pip install -r requirements.txt
    ```

### Starting Fast API backend
Starting backend for development :
```
    python app.py -e dev 
```
Starting backend for production :
```
    python app.py -w 4
```
** *optional argument : -w/--workers (default 1) (only for production)*

Visit [http://localhost:8000/hello](http://localhost:8000/hello) to check if backend api running properly. You should see this message :
```json
    {
        "message": "Hello from book-recommender-api"
    }
```
API docs will be available at :
- [http://localhost:8000/docs](http://localhost:8000/docs)
- [http://localhost:8000/redoc](http://localhost:8000/redoc)

## To work on UI (React)
### To start the development server (vite + react + tailwindcss) :
```
    cd ui
```
If you're running it for the first time :
```
    npm i
```
then
```
    npm run dev
```
### Building the ui
```
    npm run build 
```
The output directory will be : [/public](public)

## Other important stuff
- To change backend port in development or production use [/config](config).
- [Dataset](data) taken from [kaggle](https://www.kaggle.com/datasets/arashnic/book-recommendation-dataset).
- Followed tutorial of [CampusX](https://www.youtube.com/watch?v=1YoD0fg3_EM&t=2437s) to create this project's backend.
