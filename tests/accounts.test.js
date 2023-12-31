require('dotenv').config()
const axios = require("axios")
const baseURL = "http://localhost:8081"
const options = {
    headers: {
        authorization: ""
    }
}
describe("Accounts endpoint basic tests", () => {
    const newAccount =  {
        "name": "dgtduitg",
        "user_id": 2,
        "website": "www.gmail.com",
        "industry": "Manager",
        "annual_revenue": 4600129,
        "employees": 5,
        "notes": "k",
    }
    beforeAll(async () => {
        const credentials = {
            email: process.env.EMAIL_FOR_TESTS,
            password: process.env.PASSWORD_FOR_TESTS
        }
        const response = await axios.post(`${baseURL}/auth/login`, credentials);
        options.headers.authorization = `Bearer ${response.data.token}`
    })
    it("POST /accounts", async () => {
        const response = await axios.post(`${baseURL}/accounts`, newAccount, options);
        newAccount.id = response.data.account?.id;
        expect(response.data.success).toBe(true);
    });
    it("GET /accounts/:id", async () => {
        const response = await axios.get(`${baseURL}/accounts/${newAccount.id}`, options);
        expect(response.data.success).toBe(true);
    });
    it("GET /accounts", async () => {
        const response = await axios.get(`${baseURL}/accounts`, options);
        expect(response.data.records.length >= 1).toBe(true);
    });
    it("DELETE /accounts", async () => {
        const response = await axios.delete(`${baseURL}/accounts/${newAccount.id}`, options)
        expect(response.data.success).toBe(true);
    });
});