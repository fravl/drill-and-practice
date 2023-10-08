# Project 2: Drill & Practice

_Part of the [FiTech Web Software Development](https://fitech101.aalto.fi/web-software-development) class._

Explore a world of knowledge by crafting and exchanging questions across diverse subjects. Challenge yourself with quizzes featuring both your own and community-crafted questions.

The application has the following functionalities:

- Authentication and authorization
- Add or delete topics as an admin
- Add or delete questions and corresponding answer options for topics
- Quiz yourself on a topic on the web or via the API

## Quiz API

- `GET /api/questions/random` recieve a random quiz question in format:
    {
      "questionId": 1,
      "questionText": "How much is 1+1?",
      "answerOptions": [
        { "optionId": 1, "optionText": "2" },
        { "optionId": 2, "optionText": "4" },
        { "optionId": 3, "optionText": "6" },
      ]
    }
- `POST /api/questions/answer` check your answer by sending a JSON in format:
      {
        "questionId": 1,
        "optionId": 3,
      }

## View online

To test the application online visit https://wsd-project-2.fly.dev/
For testing admin functionality, use the login email _admin@admin.com_ with password _123456_

## Run locally

The application can be run locally using Docker and docker-compose.
From the root directory run `docker-compose up`.

## E2E Testing

The Playwright E2E tests can be executed by running the following command from the root directory:
`docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf`
