require('dotenv').config()
const axios = require("axios")
const baseURL = "http://localhost:8081"
const options = {
    headers: {
        authorization: ""
    }
}
describe("Contacts endpoint basic tests", () => {
    const newContact =  {
        "account_id": 1,
        "owner_id": 1,
        "address_id": 1,
        "first_name": "Pete",
        "last_name": "Smith",
        "title": "Google",
        "email": "peter.smith@google.com",
        "phone_id": 1,
        "lead_source": "Search Engine",
        "website": "https://google.com/",
        "annual_revenue": "100000",
        "lead_status": "new",
        "industry": "Technology",
        "notes": "This is a test contact.",
        "is_lead": false
    }
    beforeAll(async () => {
        const credentials = {
            email: process.env.EMAIL_FOR_TESTS,
            password: process.env.PASSWORD_FOR_TESTS
        }
        const response = await axios.post(`${baseURL}/auth/login`, credentials);
        options.headers.authorization = `Bearer ${response.data.token}`
    })
    it("POST /contacts", async () => {
        const response = await axios.post(`${baseURL}/contacts`, newContact, options);
        newContact.id = response.data.contact.id;
        expect(response.data.success).toBe(true);
    });
    it("GET /contacts/:id", async () => {
        const response = await axios.get(`${baseURL}/contacts/${newContact.id}`, options);
        expect(response.data.success).toBe(true);
    });
    it("GET /contacts", async () => {
        const response = await axios.get(`${baseURL}/contacts`, options);
        expect(response.data.contacts.length >= 1).toBe(true);
    });
    it("DELETE /contacts", async () => {
        const response = await axios.delete(`${baseURL}/contacts/${newContact.id}`, options)
        expect(response.data.success).toBe(true);
    });
});