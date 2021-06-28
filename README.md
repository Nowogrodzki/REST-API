## Installation

```bash
cd app 
npm install
npm run start
```

<h1 align="center">REST API</h1>

                                  BASE_URL - `http://ec2-18-223-123-61.us-east-2.compute.amazonaws.com:5000`

* **URL** `/list-movies`

* **Method:** `GET`
  
*  **URL Params** **Optional:** `id=[integer] allows to filter by id if not provided, reponse will contain all movies saved in database`

* **Success Response:**

    **Content:** `{ status : true, message : { count: number(amountOfData), data: array_of_movie_object }}`
#

* **URL** `/list-comments`

* **Method:** `GET`
  
*  **URL Params** **Optional:** `id=[integer] allows to filter by id if not provided, reponse will contain all comments saved in database`

* **Success Response:**

    **Content:** `{ status : true, message : { count: number(amountOfData), data: array_of_commets }}`
#

* **URL** `/create-movie`

* **Method:** `POST`
  
*  **URL Params** **Requied:** `title=[string]`

* **Success Response:**

    **Content:** `{ status : true, message : "Record successly created" }`
    
 * **Error Response:**

    **Content:** `{ status : false, message : "The movie with this title exists, title - title, id - movie_id" }`
    
    OR

    **Content:** `{ status : false, message : "Movie not found" }`
  
#

* **URL** `/add-comment`

* **Method:** `PATCH`
  
*  **URL Params** **Required:** `comment=[string], id=[number]`

* **Success Response:**

    **Content:** `{ status : true, message : "Comment successly added to the movie" }`
    
 * **Error Response:**

    **Content:** `{ status : false, message : "comment and id is required as parameters" }`
