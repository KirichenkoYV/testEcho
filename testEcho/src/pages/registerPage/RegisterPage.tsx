import React, { useEffect, useState } from "react";
import { getNewUser } from "../../slice/userSlice";
import { RootState, useAppDispatch } from "../../store/Store";
import { useSelector } from "react-redux";
import { TypeError } from "../../Types";
import { Link, useNavigate } from "react-router-dom";
import MaskedPhoneInput from "../authorizationPage/components/MaskedPhoneInput";

import style from "./RegisterPage.module.scss";

function RegisterPage() {
  const errors = useSelector((state: RootState) => state.user.errors);
  const token = useSelector((state: RootState) => state.user.token);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>(
    localStorage.getItem("firstname") || ""
  );
  const [lastName, setLastName] = useState<string>(
    localStorage.getItem("lastname") || ""
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>(
    localStorage.getItem("phonereq") || ""
  );
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      navigate("/user");
    }
  }, [token]);

  function handlRegister(): void {
    const dataNewUser = {
      phone: phone,
      password: password,
      name: firstName,
      lastName: lastName,
    };
    dispatch(getNewUser(dataNewUser));
    setShowError(true);
  }

  function swapPassword() {
    setShowPassword((prev) => !prev);
  }
  function changePhoneInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setPhone(event?.target.value);
    localStorage.setItem("phonereq", event?.target.value);
  }
  function changeFirstName(event: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(event.target.value);
    localStorage.setItem("firstname", event?.target.value);
  }
  function changeLastName(event: React.ChangeEvent<HTMLInputElement>) {
    setLastName(event.target.value);
    localStorage.setItem("lastname", event?.target.value);
  }
  function changePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  return (
    <div className={style.RegisterPage}>
      <div className={style.RegisterPageForm}>
        <div className={style.RegisterPageTitle}>Регистрация</div>
        <input
          placeholder="Введите ваше имя"
          className={style.RegisterPageInputName}
          value={firstName}
          onChange={changeFirstName}
        ></input>
        <input
          placeholder="Введите вашу фамилию"
          className={style.RegisterPageInputLastName}
          value={lastName}
          onChange={changeLastName}
        ></input>
        <input
          type={!showPassword ? "password" : "none"}
          placeholder="Введите ваш пароль"
          value={password}
          className={style.RegisterPageInputPassword}
          onChange={changePassword}
        ></input>
        <MaskedPhoneInput
          id={"phone-input"}
          name={"phone"}
          required={true}
          autoFocus={true}
          value={phone}
          onChange={changePhoneInput}
        ></MaskedPhoneInput>
        <label>
          Показать пароль{" "}
          <input type={"checkbox"} onChange={swapPassword}></input>
        </label>
        {errors &&
          showError &&
          errors.map((el: TypeError) => (
            <div className={style.RegisterPageError} key={el.param}>
              {el.msg}
            </div>
          ))}

        <Link to="/">
          <button className={style.RegisterPagePassword}>
            Вспомнили пароль?
          </button>
        </Link>
        <button className={style.RegisterPageReq} onClick={handlRegister}>
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
