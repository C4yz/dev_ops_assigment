import { cyan } from "@mui/material/colors";

describe("Se if the board Store renders", () => {
    it("should render correctly", () => {
        cy.wait(2000)
        cy.visit("http://localhost:3000/courses/DevOps/Day%201")
        cy.get("#boardContainer").should("exist")
    })
});