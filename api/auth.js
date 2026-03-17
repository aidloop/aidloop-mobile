import API from "./api";

//LOGIN AUTHENTICATION

export const login = async (email, password) => {
  try {
    const response = await API.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

//LOGOUT
export const logout = async () => {
  try {
    const response = await API.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Unable to logout", error);
    throw error;
  }
};

//REGISTER AUTHENTICATION

export const register = async (fullName, email, password) => {
  try {
    const response = await API.post("/auth/register/mobile", {
      fullName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering:", error.response?.data || error.message);
    throw error;
  }
};

//OTP VERIFICATION

export const verifyOTP = async (email, otp) => {
  try {
    const response = await API.post("/auth/verify-otp", {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error verifying OTP:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

//RESEND OTP

export const resendOTP = async (email) => {
  try {
    const response = await API.post("/auth/resend-otp", { email });
    return response.data;
  } catch (error) {
    console.error(
      "Error resending OTP:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
