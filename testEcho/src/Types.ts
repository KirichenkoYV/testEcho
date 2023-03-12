export interface TypeDataAuth {
  phone: string;
  password: string;
}

export interface MaskedProps {
  id: string;
  name: string;
  required: boolean;
  autoFocus: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface UserState {
  token: string;
  resetPass: TypeResRestartPass;
  error: string | undefined;
  errors: [TypeError] | undefined;
}

export interface TypeResRestartPass {
  errors: [] | undefined;
  message: string | undefined;
  success: boolean | undefined;
}

export interface TypeError {
  value: string;
  msg: string;
  param: string;
  location: string;
}

export interface TypeNewUser {
  phone: string;
  password: string;
  name: string;
  lastName: string;
}

export interface TypeUserPhone {
  phone: string;
}

export interface TypeDataNewPassword {
  phone: string;
  code: string;
  password: string;
}
