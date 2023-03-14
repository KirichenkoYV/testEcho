import {
  TypeDataAuth,
  TypeDataNewPassword,
  TypeDataUser,
  TypeNewUser,
  TypeUserPhone,
} from "../Types";

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

export const requestPasswordReset = async (userPhone: TypeUserPhone) => {
  const url =
    "https://backend-front-test.dev.echo-company.ru/api/user/forgot-start";
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      phone: userPhone.phone.replace(/\D/g, ""),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

export const requestPasswordCodeReset = async (
  dataNewPassword: TypeDataNewPassword
) => {
  const url =
    "https://backend-front-test.dev.echo-company.ru/api/user/forgot-end";
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      phone: dataNewPassword.phone.replace(/\D/g, ""),
      code: dataNewPassword.code,
      password: dataNewPassword.password,
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

export const requestDataUser = async (dataUser: TypeDataUser) => {
  const url = "https://backend-front-test.dev.echo-company.ru/api/user";
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: dataUser.token ?? ''
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
};
