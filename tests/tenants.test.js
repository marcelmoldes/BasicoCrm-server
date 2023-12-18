require('dotenv').config()
const axios = require("axios")
const baseURL = "http://localhost:8081"
const options = {
    headers: {
        authorization: ""
    }
}
describe("Tenants endpoint basic tests", () => {
    const newTenant=  {

        "ownerId": 79,
        "addressId": 73,
        "phoneId": 35,
        "name": "yhfyhfh",
        "website":"www.cocacola.com",
        "type": "tjtyjtyj",
        "industry": "tyjyjygj",
        "annual_revenue": 786789768,
        "employees": 7876
    }
    beforeAll(async () => {
        const credentials = {
            email: process.env.EMAIL_FOR_TESTS,
            password: process.env.PASSWORD_FOR_TESTS
        }
        const response = await axios.post(`${baseURL}/auth/login`, credentials);
        options.headers.authorization = `Bearer ${response.data.token}`
    })
    it("POST /tenants", async () => {
        const response = await axios.post(`${baseURL}/tenants`, newTenant, options);
        newTenant.id = response.data.tenant?.id;
        expect(response.data.success).toBe(true);
    });
    it("GET /tenants/:id", async () => {
        const response = await axios.get(`${baseURL}/tenants/${newTenant.id}`, options);
        expect(response.data.success).toBe(true);
    });
    it("GET /tenants", async () => {
        const response = await axios.get(`${baseURL}/tenants`, options);
        expect(response.data.records.length >= 1).toBe(true);
    });
    it("DELETE /tenants", async () => {
        const response = await axios.delete(`${baseURL}/tenants/${newTenant.id}`, options)
        expect(response.data.success).toBe(true);
    });
});