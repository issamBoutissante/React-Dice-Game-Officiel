import React from "react";
import classes from "./CloseAppIcon.module.css";

export default function CloseAppIcon({ setShowCloseDialog }) {
  const onCloseAppHandler = () => {
    setShowCloseDialog(true);
  };
  return (
    <div class={classes.closeIcon} onClick={onCloseAppHandler}>
      <span class={classes.close}>&times;</span>
    </div>
  );
}
