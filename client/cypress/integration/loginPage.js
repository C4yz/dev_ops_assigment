describe("Se if the landing page renders", () => {
    it("Should render correctly", () =>{
        cy.visit("/")
        cy.get("#container").should("exist")
    });

    it("Login button should exist", () => {
        cy.contains("Click here to login").click()

        //cy.visit("https://auth.dtu.dk/dtu/?service=http://localhost:5000/redirect")

    });

    it("Should validate the token if correct", () => {

        cy.request("http://localhost:5000/testAPI?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50bnVtYmVyIjoiczE5NTQ1NSIsImlhdCI6MTYzODI3NzY0OSwiZXhwIjoxNjM4Mjg0ODQ5fQ.gs9XCNyUP7ttn_j-st3D0ao7FtFcGtXknOhl3IULgoY")
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