import React, { useState } from "react";

import style from "./FormChangePassword.module.scss";

function FormChangePassword() {
  const [showPassword, setShowPassword] = useState(true);

  function changeShowPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <div className={style.FormChangePassword}>
      <div className={style.FormChangePasswordTitle}>
        На ваш телефон отправлен смс-пароль
      </div>
      <input
        className={style.FormChangePasswordInputSMS}
        placeholder="Введите код из СМС"
      ></input>
      <input
        className={style.FormChangePasswordInputNewPass}
        placeholder="Введите новый пароль"
        type={showPassword ? "password" : "none"}
      ></input>
      <label>
        Показать пароль{" "}
        <input type={"checkbox"} onClick={changeShowPassword}></input>
      </label>
      <button className={style.FormChangePasswordButton}>
        Изменить пароль
      </button>
    </div>
  );
}

export default FormChangePassword;
