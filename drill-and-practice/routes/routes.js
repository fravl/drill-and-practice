import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicsController from "./controllers/topicsController.js";
import * as questionsController from "./controllers/questionsController.js";
import * as questionAnswerController from "./controllers/questionAnswerController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";
import * as quizApiController from "./apis/quizApiController.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics", topicsController.showTopics);
router.post("/topics", topicsController.addTopic);
router.get("/topics/:tId", topicsController.showTopicDetails);
router.post("/topics/:tId/delete", topicsController.deleteTopic);

router.post("/topics/:tId/questions", questionsController.addQuestion);
router.get(
  "/topics/:tId/questions/:qId",
  questionsController.showQuestionDetails
);
router.post(
  "/topics/:tId/questions/:qId/delete",
  questionsController.deleteQuestion
);
router.post(
  "/topics/:tId/questions/:qId/options",
  questionAnswerController.addQuestionAnswer
);
router.post(
  "/topics/:tId/questions/:qId/options/:oId/delete",
  questionAnswerController.deleteQuestionAnswer
);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/quiz", quizController.showTopics);
router.get("/quiz/:tId", quizController.quizTopic);

router.get("/quiz/:tId/questions/:qId", quizController.showQuizQuestion);
router.post(
  "/quiz/:tId/questions/:qId/options/:oId",
  quizController.checkQuizAnswer
);
router.get("/quiz/:tId/questions/:qId/correct", quizController.correctAnswer);
router.get(
  "/quiz/:tId/questions/:qId/incorrect",
  quizController.incorrectAnswer
);

router.get("/api/questions/random", quizApiController.getRandomQuestion);
router.post("/api/questions/answer", quizApiController.postQuestionAnswer);

export { router };
