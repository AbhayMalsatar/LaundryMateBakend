import AuthUser from "../models/user.model";

export const findUserByMobileNo = async (mobileno: string) => {
  try {
    return AuthUser.findOne({ where: { mobileno: mobileno, isactive: true } });
  } catch (err) {
    throw err;
  }
};
