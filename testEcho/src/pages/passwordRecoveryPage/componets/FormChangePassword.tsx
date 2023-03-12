import React, { useState } from "react";
import { getUserNewPassword } from "../../../slice/userSlice";
import { RootState, useAppDispatch } from "../../../store/Store";
import { useSelector } from "react-redux";

import style from "./FormChangePassword.module.scss";

interface TypeProps {
  phone: string;
}

function FormChangePassword({ phone }: TypeProps) {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(true);
  const [codeSms, setCodeSms] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [showError, setShowError] = useState(false);

  function handleNewPassword() {
    const dataNewPassword = {
      phone: phone,
      code: codeSms,
      password: newPassword,
    };
    dispatch(getUserNewPassword(dataNewPassword));
    setShowError(true);
  }

  function changeShowPassword() {
    setShowPassword((prev) => !prev);
  }

  function changeCodeSms(event: React.ChangeEvent<HTMLInputElement>) {
    setCodeSms(event.target.value);
  }

  function changeNewPassword(event: React.ChangeEvent<HTMLInputElement>) {
    setNewPassword(event.target.value);
  }

  const arrErrors = useSelector((state: RootState) => state.user.errors);
  
  return (
    <div className={style.FormChangePassword}>
      <div className={style.FormChangePasswordTitle}>
        На ваш телефон отправлен смс-пароль
      </div>
      <input
        className={style.FormChangePasswordInputSMS}
        placeholder="Введите код из СМС"
        value={codeSms}
        onChange={changeCodeSms}
      ></input>
      <input
        className={style.FormChangePasswordInputNewPass}
        placeholder="Введите новый пароль"
        value={newPassword}
        onChange={changeNewPassword}
        type={showPassword ? "password" : "none"}
      ></input>
      <label>
        Показать пароль{" "}
        <input type={"checkbox"} onClick={changeShowPassword}></input>
      </label>
      <button
        className={style.FormChangePasswordButton}
        onClick={handleNewPassword}
      >
        Изменить пароль
      </button>
      {arrErrors &&
        showError &&
        arrErrors.map((el, index) => (
          <div
            className={style.FormChangePasswordError}
            key={index}
          >
            {el.msg}
          </div>
        ))}
    </div>
  );
}

export default FormChangePassword;
