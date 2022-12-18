import axios from "axios";

const baseUrl = "http://apicouture.nubiz.co.in/api/identity";

export const detailValidationApi = async (type, query) => {
  let endPoint = "ValidateEmailId";
  if (type !== "email") endPoint = "ValidateContactNo";

  try {
    const response = await axios.get(`${baseUrl}/${endPoint}?${query}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const userRegistrationApi = async (values) => {
  const endPoint = "register";
  try {
    const response = await axios.post(`${baseUrl}/${endPoint}`, values);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const userLoginApi = async (userDetails) => {
  const endPoint = "token";
  console.log(userDetails, 'user details')
  try {
    const response = await axios.post(`${baseUrl}/${endPoint}`, userDetails);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getPageListing = async ({pageNumber, pageSize = 10}) =>{
    try {
        const response = await axios.get(`http://apicouture.nubiz.co.in/api/v1/Geolocation/GetStateListByPaging?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return response;
      } catch (error) {
        return error.response;
      }
}
