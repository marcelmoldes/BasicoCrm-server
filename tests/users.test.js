require('dotenv').config()
const axios = require("axios")
const baseURL = "http://localhost:8081"
const options = {
    headers: {
        authorization: ""
    }
}
describe("Users endpoint basic tests", () => {
    const newUser = {
        "tenant_id": 1,
        "first_name": "Test",
        "last_name": "User",
        "email": "test.user@gmail.com",
        "password": "123456"
    }
    beforeAll(async () => {
        const credentials = {
            email: process.env.EMAIL_FOR_TESTS,
            password: process.env.PASSWORD_FOR_TESTS
        }
        const response = await axios.post(`${baseURL}/auth/login`, credentials);
        options.headers.authorization = `Bearer ${response.data.token}`
    })
    it("POST /users", async () => {
        const response = await axios.post(`${baseURL}/users`, newUser, options);
        newUser.id = response.data.user?.id;
        expect(response.data.success).toBe(true);
    });
    it("GET /users/:id", async () => {
        const response = await axios.get(`${baseURL}/users/${newUser.id}`, options);
        expect(response.data.success).toBe(true);
    });
    it("GET /users", async () => {
        const response = await axios.get(`${baseURL}/users`, options);
        expect(response.data.records.length >= 1).toBe(true);
    });
    it("DELETE /users", async () => {
        const response = await axios.delete(`${baseURL}/users/${newUser.id}`, options)
        expect(response.data.success).toBe(true);
    });
});