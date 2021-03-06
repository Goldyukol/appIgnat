import s from "../Forms.module.css"
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { isAuthTC, logout } from "../../Redux/Reducers/ProfileReducer";
import { AppStateType } from "../../Redux/store";

const Profile: React.FC = () => {
  const isAuth = useSelector((store: any) => store.profile.isAuth);
  const name = useSelector((store: any) => store.profile.name);
  const token: string | null = localStorage.getItem("stringToken")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(isAuthTC(token))
  }, [])

  if (isAuth) {
    return <Redirect to="/login" />
  }

  return (
    <div className={s.wrapper}>
      <span>Profile</span>
      <div>{name}</div>
      <button onClick={() => { dispatch(logout()) }}>Logout</button>
    </div>
  )

};

export default Profile