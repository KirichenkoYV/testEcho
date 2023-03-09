import MaskedInput from "react-text-mask";
import React from "react";

import style from "./MaskedPhoneInput.module.scss";

interface MaskedProps {
  id: string;
  name: string;
  required: boolean;
  autoFocus: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function MaskedPhoneInput({
  id,
  name,
  required,
  autoFocus,
  value,
  onChange,
}: MaskedProps) {
  return (
    <MaskedInput
      id={id}
      name={name}
      required={required}
      autoFocus={autoFocus}
      value={value}
      className={style.MaskedInput}
      onChange={onChange}
      type={"tel"}
      showMask={true}
      mask={[
        "+",
        "7",
        "(",
        /\d/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      pattern={"[+][7][(]\\d{3}[)]\\s\\d{3}[-]\\d{4}"}
      title={"Введите номер телефона в формате: +7(xxx) xxx-xxxx"}
    ></MaskedInput>
  );
}

export default MaskedPhoneInput;
