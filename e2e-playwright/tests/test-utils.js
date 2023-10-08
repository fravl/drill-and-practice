const registerNewUser = async (page) => {
  await page.goto("/auth/register");
  const email = `a${Math.round(Math.random() * 1000)}.b${Math.round(
    Math.random() * 1000
  )}@test.fi`;
  const password = `test-pw`;

  await page.locator("#email").fill(email);
  await page.locator("#password").fill(password);

  await page.getByRole("button", { name: "Submit" }).click();

  return { email: email, password: password };
};

const login = async (page, user) => {
  await page.goto("/auth/login");

  await page.locator("#email").fill(user.email);
  await page.locator("#password").fill(user.password);

  await page.getByRole("button", { name: "Submit" }).click();
};

export { registerNewUser, login };
