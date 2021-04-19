import React, { useState, useContext } from "react";
import { toastr } from "react-redux-toastr";

const defaultOptions = {
  title: "",
  message: "",
  type: "error",
  timeOut: 5000,
  showCloseButton: true,
  progressBar: true,
  position: "top-right",
};

export const showToast = (type, message) => {
  const options = {
    timeOut: parseInt(defaultOptions.timeOut),
    showCloseButton: defaultOptions.showCloseButton,
    progressBar: defaultOptions.progressBar,
    position: defaultOptions.position,
  };

  const toastrInstance =
    type === "info"
      ? toastr.info
      : type === "warning"
      ? toastr.warning
      : type === "error"
      ? toastr.error
      : toastr.success;

  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
  toastrInstance(capitalizedType, message, options);
};
