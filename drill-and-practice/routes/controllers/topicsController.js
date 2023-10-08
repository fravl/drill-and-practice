import * as topicsService from "../../services/topicsService.js";
import * as questionsService from "../../services/questionsService.js";
import { validasaur } from "../../deps.js";
import { unique } from "../../validators/unique.js";

const showTopics = async ({ render, user }) => {
  render("topicsList.eta", {
    topics: await topicsService.getTopics(),
    isUserAdmin: user.admin,
  });
};

const showTopicDetails = async ({ params, render }) => {
  render("topicDetails.eta", {
    topic: await topicsService.getTopic(params.tId),
    questions: await questionsService.getQuestions(params.tId),
  });
};

const addTopic = async ({ request, response, render, user }) => {
  if (!user.admin) {
    response.status = 401;
    return;
  }
  const body = request.body({ type: "form" });
  const params = await body.value;

  const topicData = {
    name: params.get("name"),
  };

  const [passes, errors] = await validasaur.validate(
    topicData,
    {
      name: [
        validasaur.required,
        validasaur.minLength(1),
        unique("topics", "name"),
      ],
    },
    { messages: { "name.unique": "Topic with this name already exists" } }
  );

  if (!passes) {
    render("topicsList.eta", {
      topics: await topicsService.getTopics(),
      name: topicData.name,
      validationErrors: errors,
      isUserAdmin: user.admin,
    });
  } else {
    await topicsService.addTopic(user.id, topicData.name);
    console.log(`Topic "${topicData.name}" created by ${user.email}`);

    response.redirect("/topics");
  }
};

const deleteTopic = async ({ params, response, user }) => {
  if (!user.admin) {
    response.status = 401;
    return;
  }

  await topicsService.deleteTopic(params.tId, user.id);
  console.log(`Topic with id "${params.tId}" deleted by ${user.email}`);

  response.redirect("/topics");
};

export { showTopics, showTopicDetails, addTopic, deleteTopic };
