require('dotenv').config()
const axios = require("axios")
const baseURL = "http://localhost:8081"
const options = {
    headers: {
        authorization: ""
    }
}
describe("Activities endpoint basic tests", () => {
    const newActivity=  {
        "user_id": 28,
        "contact_id": 16,
        "account_id": 67,
        "deal_id": 34,
        "subject": "voluate",
        "description": "yfjhyj",
        "activity_date": "2022-12-15T02:20:30.000Z",
        "location": "Mitchellton",
        "status": "ultio",
        "notes": "guhvuyv"
    }
    beforeAll(async () => {
        const credentials = {
            email: process.env.EMAIL_FOR_TESTS,
            password: process.env.PASSWORD_FOR_TESTS
        }
        const response = await axios.post(`${baseURL}/auth/login`, credentials);
        options.headers.authorization = `Bearer ${response.data.token}`
    })
    it("POST /activities", async () => {
        const response = await axios.post(`${baseURL}/activities`, newActivity, options);
        newActivity.id = response.data.activity?.id;
        expect(response.data.success).toBe(true);
    });
    it("GET /activities/:id", async () => {
        const response = await axios.get(`${baseURL}/activities/${newActivity.id}`, options);
        expect(response.data.success).toBe(true);
    });
    it("GET /activities", async () => {
        const response = await axios.get(`${baseURL}/activities`, options);
        expect(response.data.records.length >= 1).toBe(true);
    });
    it("DELETE /activities", async () => {
        const response = await axios.delete(`${baseURL}/activities/${newActivity.id}`, options)
        expect(response.data.success).toBe(true);
    });
});