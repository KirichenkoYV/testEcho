import React, { useState } from "react";
import { getNewUser } from "../../slice/userSlice";
import { RootState, useAppDispatch } from "../../store/Store";
import MaskedPhoneInput from "../authorizationPage/components/MaskedPhoneInput";
import { useSelector } from "react-redux";

import style from "./RegisterPage.module.scss";
import { TypeError } from "../../Types";
import { Link } from "react-router-dom";

function RegisterPage() {
  const dispatch = useAppDispatch();
  function handlRegister(): void {
    const dataNewUser = {
      phone: phone,
      password: password,
      name: firstName,
      lastName: lastName,
    };
    dispatch(getNewUser(dataNewUser));
  }

  const errors = useSelector((state: RootState) => state.user.errors);

  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState<string>("");
  function swapPassword() {
    setShowPassword((prev) => !prev);
  }
  function changePhoneInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setPhone(event?.target.value);
  }

  function changeFirstName(event: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(event.target.value);
  }
  function changeLastName(event: React.ChangeEvent<HTMLInputElement>) {
    setLastName(event.target.value);
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
