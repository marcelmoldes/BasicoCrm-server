require('dotenv').config()
const axios = require("axios")
const baseURL = "http://localhost:8081"
const options = {
    headers: {
        authorization: ""
    }
}
describe("Addresses endpoint basic tests", () => {
    const newAddress =  {
        "streetAddress1": "gergergrg",
        "streetAddress2": "frwrgre",
        "state": "rggr",
        "city": "rgfrgrgt",
        "country": "htrhtrhrthyr",
        "postal_code": 6989
    }
    beforeAll(async () => {
        const credentials = {
            email: process.env.EMAIL_FOR_TESTS,
            password: process.env.PASSWORD_FOR_TESTS
        }
        const response = await axios.post(`${baseURL}/auth/login`, credentials);
        options.headers.authorization = `Bearer ${response.data.token}`
    })
    it("POST /addresses", async () => {
        const response = await axios.post(`${baseURL}/addresses`, newAddress, options);
        newAddress.id = response.data.address.id;
        expect(response.data.success).toBe(true);
    });
    it("GET /addresses/:id", async () => {
        const response = await axios.get(`${baseURL}/addresses/${newAddress.id}`, options);
        expect(response.data.success).toBe(true);
    });
    it("GET /addresses", async () => {
        const response = await axios.get(`${baseURL}/addresses`, options);
        expect(response.data.addresses.length >= 1).toBe(true);
    });
    it("DELETE /addresses", async () => {
        const response = await axios.delete(`${baseURL}/addresses/${newAddress.id}`, options)
        expect(response.data.success).toBe(true);
    });
});