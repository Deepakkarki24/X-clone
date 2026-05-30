import type { UserDocument } from "../models/user.models.js";

export const omitPassword = (user: UserDocument) => {
  const doc = user.toObject();
  const { password: _password, ...userWithoutPassword } = doc;
  return userWithoutPassword;
};
