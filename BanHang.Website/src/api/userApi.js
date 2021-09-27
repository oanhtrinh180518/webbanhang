import axiosClient from "./axiosClient";

// call api
const userApi = {
  login: (username, password) => {
    const data = JSON.stringify({
      username: username,
      password: password,
    });
    return axiosClient.post(
      `${process.env.REACT_APP_API_URL}/user/login`,
      data
    );
  },

  register: (
    fullName,
    username,
    email,
    phoneNumber,
    password,
    confirmPassword
  ) => {
    const data = JSON.stringify({
      FullName: fullName,
      UserName: username,
      Email: email,
      PhoneNumber: phoneNumber,
      Password: password,
      ConfirmPassword: confirmPassword,
    });
    return axiosClient.post(
      `${process.env.REACT_APP_API_URL}/user/register`,
      data
    );
  },

  getUserByToken: () => {
    return axiosClient.get(
      `${process.env.REACT_APP_API_URL}/user/getuserbytoken`
    );
  },

  getUserById: (userId) => {
    return axiosClient.post(
      `${process.env.REACT_APP_API_URL}/user/getuserbyid`,
      userId
    );
  },

  updateUserInfo: (
    FullName,
    Username,
    Email,
    PhoneNumber,
    Age,
    Birthday,
    Gender,
    Address
  ) => {
    const data = JSON.stringify({
      username: Username,
      fullName: FullName,
      email: Email,
      phoneNumber: PhoneNumber,
      age: Age,
      birthday: Birthday,
      gender: Gender,
      address: Address,
    });
    return axiosClient.put(
      `${process.env.REACT_APP_API_URL}/user/update`,
      data
    );
  },

  getAllMember: (
    PageIndex,
    PageSize,
    FullName,
    UserName,
    PhoneNumber,
    Active
  ) => {
    const reqBody = JSON.stringify({
      PageIndex: PageIndex,
      PageSize: PageSize,
      FullName: FullName,
      UserName: UserName,
      PhoneNumber: PhoneNumber,
      Active: Active,
    });
    return axiosClient.post(
      `${process.env.REACT_APP_API_URL}/user/getall`,
      reqBody
    );
  },

  updateMemberActive: (isActive, memberId) => {
    const reqBody = JSON.stringify({
      isActive: isActive,
    });
    console.log("reqBody", reqBody);
    return axiosClient.put(
      `${process.env.REACT_APP_API_URL}/user/adminactive/${memberId}`,
      reqBody
    );
  },

  forgotPassword: (Email) => {
    const reqBody = JSON.stringify({
      Email: Email,
    });
    return axiosClient.post(
      `${process.env.REACT_APP_API_URL}/user/forgotpassword`,
      reqBody
    );
  },

  resetPassword: (params) => {
    const { Token, Email, NewPassword, ConfirmNewPassword } = params;
    const reqBody = JSON.stringify({
      Token: Token,
      Email: Email,
      NewPassword: NewPassword,
      ConfirmNewPassword: ConfirmNewPassword,
    });
    console.log(reqBody);
    return axiosClient.post(
      `${process.env.REACT_APP_API_URL}/user/reset-password`,
      reqBody
    );
  },

  changePassword: (params) => {
    const { CurrentPassword, NewPassword, ConfirmNewPassword } = params;
    const reqBody = JSON.stringify({
      CurrentPassword: CurrentPassword,
      NewPassword: NewPassword,
      ConfirmNewPassword: ConfirmNewPassword,
    });
    console.log(reqBody);
    return axiosClient.post(
      `${process.env.REACT_APP_API_URL}/user/change-password`,
      reqBody
    );
  },

  getAllUsernames: () => {
    return axiosClient.get(
      `${process.env.REACT_APP_API_URL}/user/getallusernames`
    );
  },
};
export default userApi;
