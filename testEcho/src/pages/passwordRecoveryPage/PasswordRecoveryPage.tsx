import React, { useState } from "react";
import { Link } from "react-router-dom";
import MaskedPhoneInput from "../authorizationPage/components/MaskedPhoneInput";
import FormChangePassword from "./componets/FormChangePassword";

import style from "./PasswordRecoveryPage.module.scss";

function PasswordRecoveryPage() {
  const [phone, setPhone] = useState<string>("");

  function changePhoneInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setPhone(event?.target.value);
  }

  return (
    <div className={style.PasswordRecovery}>
      <div className={style.PasswordRecoveryForm}>
        <div className={style.PasswordRecoveryTitle}>Авторизация</div>
        <MaskedPhoneInput
          id={"phone-input"}
          name={"phone"}
          required={true}
          autoFocus={true}
          value={phone}
          onChange={changePhoneInput}
        ></MaskedPhoneInput>
        <button className={style.PasswordRecoveryGetSMS}>
          Получить код проверки
        </button>
        <FormChangePassword/>
        <Link to="/">
          <button className={style.PasswordRecoveryAuth}>
            Вспомнили пароль?
          </button>
        </Link>
        <Link to="/register">
          <button className={style.PasswordRecoveryReq}>Регистрация</button>
        </Link>
      </div>
    </div>
  );
}

export default PasswordRecoveryPage;
