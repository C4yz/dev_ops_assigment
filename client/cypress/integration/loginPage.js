describe("Se if the landing page renders", () => {
    it("Should render correctly", () =>{
        cy.visit("/")
        cy.get("#container").should("exist")
    });

    it("Should login when button is clicked", () => {
        cy.contains("Click here to login").should("exist")

        /*cy.request({
            url:"http://localhost:5000/login"
            //followRedirect: true
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.redirectedToUrl).to.eq("http://localhost:5000/redirect")
        })

        //cy.request('https://auth.dtu.dk/dtu/?service=http://localhost:5000/redirect')
        cy.get("input[type=email]").type("s195455")
        cy.get("input[type=password]").type("Yhp84kxj")
        cy.contains("Log på").click()
        cy.get("#boardContainer").should("exist")*/
    });
});