require('dotenv').config();
import { sign } from 'jsonwebtoken';

//C:\Users\bruger\Desktop\Mapper\dev_ops_assigment\.env
//C:\Users\bruger\Desktop\Mapper\dev_ops_assigment\client\cypress\integration\loginPage.js

describe("Se if the landing page renders", () => {
    it("Should render correctly", () =>{
        cy.visit("/")
        cy.get("#container").should("exist")
    });

    it("Login button should exist", () => {
        cy.contains("Click here to login").should("exist")

    });

    it("Should validate the token if correct", () => {
        const token = sign(
            {studentnumber: "s195455"},
            process.env.JWT_TOKEN,
            {
                expiresIn: "2h"
            }
        )

        cy.request("http://localhost:5000/testAPI?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50bnVtYmVyIjoiczE5NTQ1NSIsImlhdCI6MTYzODI3MDA1NCwiZXhwIjoxNjM4Mjc3MjU0fQ.FCuZ8KtgbHvY8BBgHrspXyYmrDa4hgER9cAMkj45vlA")
        .then((response) => {
            expect(response.status).to.eq(200)
        })

    });

    it("Should not validte the token", () => {
        cy.request({
            url:"http://localhost:5000/testAPI?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50bnVtYmVyIjoiczE5NTQ1NSIsImlhdCI6MTYzODI3MDA1NCwiZXhwIjoxNjM4Mjc3MjU0fQ.FCuZ8KtgbHvY8BBgHrspXyYmrDa4hgER9cAMkj45vlb",
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.eq(401)
        })

    });

});