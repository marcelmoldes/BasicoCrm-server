require('dotenv').config()
const axios = require("axios")
const baseURL = "http://localhost:8081"
const options = {
    headers: {
        authorization: ""
    }
}
describe("Attachments endpoint basic tests", () => {
    const newAttachment =  {
        "account_id": 5,
        "name": "hgdrgrr",
        "path": "dgdgdg",
        "deal_id": 8,
        "contact_id": 6
    }
    beforeAll(async () => {
        const credentials = {
            email: process.env.EMAIL_FOR_TESTS,
            password: process.env.PASSWORD_FOR_TESTS
        }
        const response = await axios.post(`${baseURL}/auth/login`, credentials);
        options.headers.authorization = `Bearer ${response.data.token}`
    })
    it("POST /attachments", async () => {
        const response = await axios.post(`${baseURL}/attachments`, newAttachment, options);
        newAttachment.id = response.data.attachment?.id;
        expect(response.data.success).toBe(true);
    });
    it("GET /attachments/:id", async () => {
        const response = await axios.get(`${baseURL}/attachments/${newAttachment.id}`, options);
        expect(response.data.success).toBe(true);
    });
    it("GET /attachments", async () => {
        const response = await axios.get(`${baseURL}/attachments`, options);
        expect(response.data.records.length >= 1).toBe(true);
    });
    it("DELETE /attachments", async () => {
        const response = await axios.delete(`${baseURL}/attachments/${newAttachment.id}`, options)
        expect(response.data.success).toBe(true);
    });
});