import { bcrypt, validasaur } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { unique } from "../../validators/unique.js";

const registerUser = async ({ request, response, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const registrationData = {
    email: params.get("email"),
    password: params.get("password"),
  };

  const [passes, errors] = await validasaur.validate(
    registrationData,
    {
      email: [
        validasaur.required,
        validasaur.isEmail,
        unique("users", "email"),
      ],
      password: [validasaur.required, validasaur.minLength(4)],
    },
    {
      messages: {
        "email.unique": "User with this email address already exists",
      },
    }
  );

  if (!passes) {
    console.log(errors);
    render("registration.eta", {
      validationErrors: errors,
      email: registrationData.email,
      password: registrationData.password,
    });
  } else {
    await userService.addUser(
      registrationData.email,
      await bcrypt.hash(registrationData.password)
    );

    response.redirect("/auth/login");
  }
};

const showRegistrationForm = ({ render }) => {
  render("registration.eta");
};

export { registerUser, showRegistrationForm };
