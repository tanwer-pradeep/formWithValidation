import axios from 'axios';

const baseUrl = 'http://apicouture.nubiz.co.in/api/identity'
export const detailValidationApi = async (type, query) => {
    let endPoint = 'ValidateEmailId';
    if(type !== 'email') endPoint = 'ValidateContactNo';

    const response = await axios.get(`${baseUrl}/${endPoint}?${query}`);
    return response;
}


export const userRegistrationApi = async (values) => {
    const endPoint = 'register';
    const response = await axios.post(`${baseUrl}/${endPoint}`, values);
    return response;
}