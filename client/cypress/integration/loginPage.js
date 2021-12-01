import { sign, verify } from 'jsonwebtoken';

describe("Se if the landing page renders", () => {

    it("Should render correctly", () =>{
        cy.visit("/")
        cy.get("#container").should("exist")
    });

    it("Login button should exist", () => {
        //cy.contains("Click here to login").should('exist')



    });

    it("Should validate the token if correct", () => {

        const token = sign(
            {studentnumber: "s195455"},
            Cypress.env("JWT_TOKEN"),
            {
                expiresIn: "2h"
            }
        )
        //verify(token, Cypress.env("JWT_TOKEN"))

        cy.request("http://localhost:5000/testAPI?token="+token)
        .then((response) => {
            expect(response.status).to.eq(200)
        })

    });

    it("Should not validte the token", () => {
        cy.request({
            url:"http://localhost:5000/testAPI?token=HuberBubber",
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.eq(401)
        })

    });

});