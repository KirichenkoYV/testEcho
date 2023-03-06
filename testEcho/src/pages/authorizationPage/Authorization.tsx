import React from "react";

import style from "./Authorization.module.scss";

function Authorization() {
  return (
    <div className={style.Authorization}>
      <div>авторизация</div>
      <input value={"+7(___) ___-____"}></input>
      <input></input>
      <label>
        Показать пароль<input type={"checkbox"}></input>
      </label>
      <button>Вход</button>
      <label>
        Запомнить меня<input type={"checkbox"}></input>
      </label>
      <button>Забыли пароль?</button>
      <button>Регистрация</button>
    </div>
  );
}

export default Authorization;
