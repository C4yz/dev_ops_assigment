describe("Se if the landing page renders", () => {
    it("Should render correctly", () =>{
        cy.visit("/")
        cy.get("#container").should("exist")
    });

    /*it("Should login when button is clicked", () => {
        cy.contains("Click here to login").click()

        /*cy.wait(4000)
        cy.get("input[type=email]").type("s195455")
        cy.get("input[type=password]").type("Yhp84kxj")
        cy.contains("Log på").click()
        cy.get("#boardContainer").should("exist")
    });*/
});