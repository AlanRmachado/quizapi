export interface IBodyLogin {
  email: string;
  password: string;
}

export interface ILoginResult {
  token: string;
  status: number
}