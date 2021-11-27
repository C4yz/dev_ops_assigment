describe("Se if the landing page renders", () => {
    it("Should render correctly", () =>{
        cy.visit("/")
        cy.get("#container").should("exist")
    });

    it("Should login when button is clicked", () => {
        cy.wait(2000)
        cy.contains("Click here to login").click()
        cy.get("#boardContainer").should("exist")
    });
});