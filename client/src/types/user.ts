export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  location?: string | null;
  bio?: string | null;
  profileImg: string;
  coverImg: string;
  createdAt?: string;
}

export interface SignupErrors {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginErrors {
  userEmail: string;
  userPass: string;
}

export interface ProfileFormData {
  profile_image: File | "";
  cover_image: File | "";
  name: string;
  bio: string;
  location: string;
}

export const initialProfileFormData: ProfileFormData = {
  profile_image: "",
  cover_image: "",
  name: "",
  bio: "",
  location: "",
};
