import React, { useEffect } from "react";
import { RootState, useAppDispatch } from "../../store/Store";
import { useNavigate } from "react-router-dom";
import { deleteToken, getUserToken } from "../../slice/userSlice";
import { useSelector } from "react-redux";

import style from "./CabinetUser.module.scss";

function CabinetUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  let nameUser = useSelector((state: RootState) => state.user.resDataUser);

  useEffect(() => {
    const dataUser = { token: localStorage.getItem("token") };
    dispatch(getUserToken(dataUser));
    if (!token) {
      navigate("/");
    }
  }, [token]);

  function logOut() {
    dispatch(deleteToken());
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className={style.CabinetUser}>
      <div className={style.CabinetUserGreetings}>
        Привет, {nameUser?.first_name} {nameUser?.last_name}
      </div>
      <button className={style.CabinetUserLogout} onClick={logOut}>
        Выйти
      </button>
    </div>
  );
}

export default CabinetUser;
