import { TypeDataAuth, TypeNewUser } from "../Types";

export const requestAuth = async (dataAuth: TypeDataAuth) => {
  const url = "https://backend-front-test.dev.echo-company.ru/api/auth/login";
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      phone: dataAuth.phone.replace(/\D/g, ""),
      password: dataAuth.password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const requestRegister = async (dataNewUser: TypeNewUser) => {
  const url =
    "https://backend-front-test.dev.echo-company.ru/api/user/registration";
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      phone: dataNewUser.phone.replace(/\D/g, ""),
      password: dataNewUser.password,
      first_name: dataNewUser.name,
      last_name: dataNewUser.lastName,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(JSON.stringify(data.errors));
  }
  return data;
};
