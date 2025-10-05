enum userType {
  DEV = "DEV",
  GUEST = "GUEST",
  USER = "USER",
}

export interface User {
  user_id: string;
  user_email: string;
  password: string;
  name: string;
  user_type: userType;
}
