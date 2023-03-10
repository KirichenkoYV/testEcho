import React, { useState } from "react";
import MaskedInput from "./components/MaskedPhoneInput";

import style from "./Authorization.module.scss";
import { getUser } from "../../slice/userSlice";
import { RootState, useAppDispatch } from "../../store/Store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Authorization() {
  const dispatch = useAppDispatch();
  function handleLogin(): void {
    const dataAuth = { phone: phone, password: password };
    dispatch(getUser(dataAuth));
  }
  const error = useSelector((state: RootState) => state.user.error);
  const [phone, setPhone] = useState<string>(
    localStorage.getItem("formphone") || ""
  );
  const [statusRememberMe, setstatusRememberMe] = useState(
    checkStatus() || false
  );
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState<string>("");

  function checkStatus() {
    return localStorage.getItem("statusRememberMe") === "false" ? false : true;
  }

  function changePhoneInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setPhone(event?.target.value);
    if (statusRememberMe) {
      localStorage.setItem("formphone", event?.target.value);
    }
  }

  function changePassword(event: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value);
  }

  function rememberMe(event: React.ChangeEvent<HTMLInputElement>): void {
    localStorage.setItem("statusRememberMe", String(event?.target.checked));
    setstatusRememberMe((prev) => !prev);
  }

  function swapPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <div className={style.Authorization}>
      <div className={style.AuthorizationForm}>
        <div className={style.AuthorizationTitle}>Авторизация</div>
        <MaskedInput
          id={"phone-input"}
          name={"phone"}
          required={true}
          autoFocus={true}
          value={phone}
          onChange={changePhoneInput}
        ></MaskedInput>
        <input
          className={style.AuthorizationInptPassword}
          placeholder="Введите пароль"
          type={!showPassword ? "password" : "none"}
          value={password}
          onChange={changePassword}
        ></input>
        {error && <div className={style.AuthorizationError}>{error}</div>}
        <label>
          Показать пароль{" "}
          <input type={"checkbox"} onChange={swapPassword}></input>
        </label>
        <button className={style.AuthorizationEntr} onClick={handleLogin}>
          Вход
        </button>
        <label>
          Запомнить меня
          <input
            checked={statusRememberMe}
            type={"checkbox"}
            onChange={rememberMe}
          ></input>
        </label>
        <button className={style.AuthorizationPassword}>Забыли пароль?</button>
        <Link to="/register">
          <button className={style.AuthorizationReq}>Регистрация</button>
        </Link>
      </div>
    </div>
  );
}

export default Authorization;
