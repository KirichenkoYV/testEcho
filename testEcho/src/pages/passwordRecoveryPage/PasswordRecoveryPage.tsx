import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserPhone } from "../../slice/userSlice";
import { RootState, useAppDispatch } from "../../store/Store";
import MaskedPhoneInput from "../authorizationPage/components/MaskedPhoneInput";
import FormChangePassword from "./componets/FormChangePassword";
import { useSelector } from "react-redux";

import style from "./PasswordRecoveryPage.module.scss";

function PasswordRecoveryPage() {
  const dispatch = useAppDispatch();

  const statusRes = useSelector((state: RootState) => state.user.resetPass);

  const [phone, setPhone] = useState<string>(
    localStorage.getItem("formphonerestart") || ""
  );
  const [restartCount, setRestartCount] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [sendSmsButtonDisabled, setSendSmsButtonDisabled] =
    useState<boolean>(false);
  const [sendSmsButtonText, setSendSmsButtonText] =
    useState<string>("Получить смс код");
  const [numberChange, setNumberChange] = useState<boolean>(false);
  
  useEffect(() => {
    if (statusRes.success || restartCount) {
      setSecondsLeft(20);
      setSendSmsButtonText(`Повторный код через 20 сек`);
    }
  }, [statusRes.success, restartCount]);

  useEffect(() => {
    if (secondsLeft > 0) {
      const interval = setInterval(() => {
        setSendSmsButtonText(`Повторный код через ${secondsLeft - 1} сек`);
        setSecondsLeft((prev) => prev - 1);
        setSendSmsButtonDisabled(true);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setSendSmsButtonDisabled(false);
      setSendSmsButtonText("Получить код проверки");
    }
  }, [secondsLeft]);

  function changePhoneInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setPhone(event?.target.value);
    localStorage.setItem("formphonerestart", event?.target.value);
    setNumberChange(false);
  }

  function getPassword(): void {
    if (statusRes.success && numberChange) {
      localStorage.getItem("formphonerestart");
      setRestartCount((prev) => !prev);
    } else {
      const userPhone = { phone: phone };
      dispatch(getUserPhone(userPhone));
      setNumberChange(true);
    }
  }

  return (
    <div className={style.PasswordRecovery}>
      <div className={style.PasswordRecoveryForm}>
        <div className={style.PasswordRecoveryTitle}>Восстановить пароль</div>
        <MaskedPhoneInput
          id={"phone-input"}
          name={"phone"}
          required={true}
          autoFocus={true}
          value={phone}
          onChange={changePhoneInput}
        ></MaskedPhoneInput>
        <button
          className={style.PasswordRecoveryGetSMS}
          onClick={getPassword}
          disabled={sendSmsButtonDisabled}
        >
          {sendSmsButtonText}
        </button>
        {statusRes.success ? (
          <FormChangePassword phone={phone} />
        ) : (
          <div className={style.PasswordRecoveryError}>{statusRes.message}</div>
        )}
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
