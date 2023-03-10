import React from "react";

import style from "./CabinetUser.module.scss";

function CabinetUser() {
  return (
    <div className={style.CabinetUser}>
      <div className={style.CabinetUserGreetings}>Привет, Тестовый аккаунт</div>
      <button className={style.CabinetUserLogout}>Выйти</button>
    </div>
  );
}

export default CabinetUser;
