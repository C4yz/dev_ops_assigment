describe("Se if the landing page renders", () => {

    it("Should render correctly", () =>{
        cy.visit("/")
        cy.wait(3000)
        cy.get("#container").should("exist")
    });

    it("Login button should exist", () => {
        cy.contains("Click here to login").should("exist")
    });

    it("Should not validte if the token is wrong", () => {
        cy.request({
            url:"http://localhost:5000/testAPI?token=HuberBubber",
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.eq(401)
        })

    });

});