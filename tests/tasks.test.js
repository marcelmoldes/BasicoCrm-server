require('dotenv').config()
const axios = require("axios")
const baseURL = "http://localhost:8081"
const options = {
    headers: {
        authorization: ""
    }
}
describe("Tasks endpoint basic tests", () => {
    const newTask =  {
        "contactId": 1,
        "ownerId": 4,
        "dealId": 6,
        "accountId": 5,
        "name": "pepito",
        "description": "hooly",
        "due_date": "2023-04-29 06:17:57",
        "status": "defd",
        "priority": "fweewf",
    }
    beforeAll(async () => {
        const credentials = {
            email: process.env.EMAIL_FOR_TESTS,
            password: process.env.PASSWORD_FOR_TESTS
        }
        const response = await axios.post(`${baseURL}/auth/login`, credentials);
        options.headers.authorization = `Bearer ${response.data.token}`
    })
    it("POST /task", async () => {
        const response = await axios.post(`${baseURL}/tasks`, newTask, options);
        newTask.id = response.data.task?.id;
        expect(response.data.success).toBe(true);
    });
    it("GET /tasks/:id", async () => {
        const response = await axios.get(`${baseURL}/tasks/${newTask.id}`, options);
        expect(response.data.success).toBe(true);
    });
    it("GET /tasks", async () => {
        const response = await axios.get(`${baseURL}/tasks`, options);
        expect(response.data.records.length >= 1).toBe(true);
    });
    it("DELETE /tasks", async () => {
        const response = await axios.delete(`${baseURL}/tasks/${newTask.id}`, options)
        expect(response.data.success).toBe(true);
    });
});