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
  error: string | undefined
}
