require('dotenv').config()
const axios = require("axios")
const baseURL = "http://localhost:8081"
const options = {
    headers: {
        authorization: ""
    }
}
describe("Deals endpoint basic tests", () => {
    const newDeal =  {
        "owner_id": 19,
        "account_id": 7,
        "deal_name": "claudeo",
        "deal_value": "1090342",
        "close_date": "2023-04-25T09:45:54.000Z",
        "status": "gaseous"
    }
    beforeAll(async () => {
        const credentials = {
            email: process.env.EMAIL_FOR_TESTS,
            password: process.env.PASSWORD_FOR_TESTS
        }
        const response = await axios.post(`${baseURL}/auth/login`, credentials);
        options.headers.authorization = `Bearer ${response.data.token}`
    })
    it("POST /deals", async () => {
        const response = await axios.post(`${baseURL}/deals`, newDeal, options);
        newDeal.id = response.data.deal.id;
        expect(response.data.success).toBe(true);
    });
    it("GET /deals/:id", async () => {
        const response = await axios.get(`${baseURL}/deals/${newDeal.id}`, options);
        expect(response.data.success).toBe(true);
    });
    it("GET /deals", async () => {
        const response = await axios.get(`${baseURL}/deals`, options);
        expect(response.data.deals.length >= 1).toBe(true);
    });
    it("DELETE /deals", async () => {
        const response = await axios.delete(`${baseURL}/deals/${newDeal.id}`, options)
        expect(response.data.success).toBe(true);
    });
});