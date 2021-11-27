describe("Se if the landing page renders", () => {
    it("Should render correctly", () =>{
        cy.visit("/")
        cy.get("#container").should("exist")
    });
});