import React, { useEffect } from "react";
import { RootState, useAppDispatch } from "../../store/Store";
import { useSelector } from "react-redux";

import style from "./CabinetUser.module.scss";
import { useNavigate } from "react-router-dom";
import { deleteToken } from "../../slice/userSlice";

function CabinetUser() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  //const token = useSelector((state: RootState) => state.user.token);
  const token = localStorage.getItem("token");

  function logOut() {
    // dispatch(deleteToken());
    localStorage.clear();
    navigate("/");
  }
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className={style.CabinetUser}>
      <div className={style.CabinetUserGreetings}>Привет, Тестовый аккаунт</div>
      <button className={style.CabinetUserLogout} onClick={logOut}>
        Выйти
      </button>
    </div>
  );
}

export default CabinetUser;
