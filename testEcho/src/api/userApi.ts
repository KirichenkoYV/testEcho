export const requestAuth = async (phone: string, password: string) => {
  const url = "https://backend-front-test.dev.echo-company.ru//api/auth/login";
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      phone: phone.replace(/\D/g, ""),
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
};
