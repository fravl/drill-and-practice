import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";

const processLogin = async ({ request, response, state, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const userFromDatabase = await userService.findUserByEmail(
    params.get("email")
  );
  if (userFromDatabase.length != 1) {
    render("login.eta", {
      loginFailed: true,
      email: params.get("email"),
      password: params.get("password"),
    });
    return;
  }

  const user = userFromDatabase[0];
  const passwordMatches = await bcrypt.compare(
    params.get("password"),
    user.password
  );

  if (!passwordMatches) {
    render("login.eta", {
      loginFailed: true,
      email: params.get("email"),
      password: params.get("password"),
    });
    return;
  }

  await state.session.set("user", user);
  console.log(`Hello ${user.email}!`);

  response.redirect("/topics");
};

const showLoginForm = ({ render }) => {
  render("login.eta");
};

export { processLogin, showLoginForm };
