require('dotenv').config()
const axios = require("axios")
const baseURL = "http://localhost:8081"
const options = {
    headers: {
        authorization: ""
    }
}
describe("PhoneNumbers endpoint basic tests", () => {
    const newPhoneNumber=  {
        "account_id": 1,
        "country_code": "VG",
        "number": "981389525"
    }
    beforeAll(async () => {
        const credentials = {
            email: process.env.EMAIL_FOR_TESTS,
            password: process.env.PASSWORD_FOR_TESTS
        }
        const response = await axios.post(`${baseURL}/auth/login`, credentials);
        options.headers.authorization = `Bearer ${response.data.token}`
    })
    it("POST /phonenumbers", async () => {
        const response = await axios.post(`${baseURL}/phonenumbers`, newPhoneNumber, options);
        newPhoneNumber.id = response.data.phonenumber?.id;
        expect(response.data.success).toBe(true);
    });
    it("GET /phonenumbers/:id", async () => {
        const response = await axios.get(`${baseURL}/phonenumbers/${newPhoneNumber.id}`, options);
        expect(response.data.success).toBe(true);
    });
    it("GET /phonenumbers", async () => {
        const response = await axios.get(`${baseURL}/phonenumbers`, options);
        expect(response.data.records.length >= 1).toBe(true);
    });
    it("DELETE /phonenumbers", async () => {
        const response = await axios.delete(`${baseURL}/phonenumbers/${newPhoneNumber.id}`, options)
        expect(response.data.success).toBe(true);
    });
});