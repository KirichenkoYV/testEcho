import React, { useEffect, useState } from "react";
import MaskedInput from "./components/MaskedPhoneInput";
import { getUser } from "../../slice/userSlice";
import { RootState, useAppDispatch } from "../../store/Store";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import style from "./Authorization.module.scss";

function Authorization() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = useSelector((state: RootState) => state.user.token);
  let error = useSelector((state: RootState) => state.user.error);

  const [phone, setPhone] = useState<string>(
    localStorage.getItem("formphone") || ""
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      navigate("/user");
    }
  }, [token]);

  function handleLogin(): void {
    const dataAuth = { phone: phone, password: password };
    dispatch(getUser(dataAuth));
    setShowError(true);
  }
  function changePhoneInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setPhone(event?.target.value);
    localStorage.setItem("formphone", event?.target.value);
  }

  function changePassword(event: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value);
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
        {error && showError && (
          <div className={style.AuthorizationError}>{error}</div>
        )}
        <label>
          Показать пароль{" "}
          <input type={"checkbox"} onChange={swapPassword}></input>
        </label>
        <button className={style.AuthorizationEntr} onClick={handleLogin}>
          Вход
        </button>
        <Link to="/restorePassword">
          <button className={style.AuthorizationPassword}>
            Забыли пароль?
          </button>
        </Link>
        <Link to="/register">
          <button className={style.AuthorizationReq}>Регистрация</button>
        </Link>
      </div>
    </div>
  );
}

export default Authorization;
