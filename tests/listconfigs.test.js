require('dotenv').config()
const axios = require("axios")
const baseURL = "http://localhost:8081"
const options = {
    headers: {
        authorization: ""
    }
}
describe("ListConfigs endpoint basic tests", () => {
    const newListConfig =  {
        "tenant_id": 1,
        "field": "rgrgeg",
        "value":568
    }
    beforeAll(async () => {
        const credentials = {
            email: process.env.EMAIL_FOR_TESTS,
            password: process.env.PASSWORD_FOR_TESTS
        }
        const response = await axios.post(`${baseURL}/auth/login`, credentials);
        options.headers.authorization = `Bearer ${response.data.token}`
    })
    it("POST /listconfigs", async () => {
        const response = await axios.post(`${baseURL}/listconfigs`, newListConfig, options);
        newListConfig.id = response.data.listconfig?.id;
        expect(response.data.success).toBe(true);
    });
    it("GET /listconfigs/:id", async () => {
        const response = await axios.get(`${baseURL}/listconfigs/${newListConfig.id}`, options);
        expect(response.data.success).toBe(true);
    });
    it("GET /listconfigs", async () => {
        const response = await axios.get(`${baseURL}/listconfigs`, options);
        expect(response.data.records.length >= 1).toBe(true);
    });
    it("DELETE /listconfigs", async () => {
        const response = await axios.delete(`${baseURL}/listconfigs/${newListConfig.id}`, options)
        expect(response.data.success).toBe(true);
    });
});