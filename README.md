# Project 2: Drill & Practice

![Deno JS](https://img.shields.io/badge/deno%20js-000000?style=for-the-badge&logo=deno&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

_Part of the [FiTech Web Software Development](https://fitech101.aalto.fi/web-software-development) class._

Explore a world of knowledge by crafting and exchanging questions across diverse subjects. Challenge yourself with quizzes featuring both your own and community-crafted questions.

The application has the following functionalities:

- Authentication and authorization
- Add or delete topics as an admin
- Add or delete questions and corresponding answer options for topics
- Quiz yourself on a topic on the web or via the API

## Quiz API

- `GET /api/questions/random` recieve a random quiz question in format:
    ````json
    {
      "questionId": 1,
      "questionText": "How much is 1+1?",
      "answerOptions": [
        { "optionId": 1, "optionText": "2" },
        { "optionId": 2, "optionText": "4" },
        { "optionId": 3, "optionText": "6" },
      ]
    }
    ````
- `POST /api/questions/answer` check your answer by sending a JSON in format:
  ````json
  {
    "questionId": 1,
    "optionId": 3,
  }
  ````

## View online

To test the application online visit https://wsd-project-2.fly.dev/

For testing admin functionality, use the login email _admin@admin.com_ with password _123456_

## Run locally

Running the application requires a [Docker](https://www.docker.com/get-started) and
[Docker Compose](https://docs.docker.com/compose/install/) installation on your machine.

To start the application and a Postgresql database, run the following command

```bash
docker-compose up
```

and access the application at [http://localhost:7777](http://localhost:7777)

## E2E Testing

The Playwright E2E tests can be executed by running the following command from the root directory:

````bash
docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf
````

In case of any errors such as Flyway migrations not completing, run `docker-compose down` and try again.

Note that the database is not setup and torn for individual test runs and test database entries remain after the tests. 

