import { TypeDataAuth } from "../Types";

export const requestAuth = async (dataAuth: TypeDataAuth) => {
  const url = "https://backend-front-test.dev.echo-company.ru//api/auth/login";
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
