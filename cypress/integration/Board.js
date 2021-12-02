
describe("Se if the board component renders", () => {

    beforeEach(() => {
        cy.visit("courses/DevOps/Day%201")
        cy.wait(3000)
    })

    it("should render the board correctly", () => {
        cy.wait(2000)
        cy.get("#boardContainer").should("exist")
    })

    it("should have the right data", () => {

        cy.intercept(
            {
                method:"GET",
                url:"http://130.225.170.203/api/allCourses"
            },
            [],
            (req) => {
                for(let i = 0; i < req.body.length; i++){
                    cy.contains(req.body[i].name).should("exist")
                }
            }
        )
    })
    
});

describe("Se if the buttons on the board works", () => {
    it("Should display no answers when clicked", () =>{
        cy.contains('No answers yet').click()
        cy.get('#simple-tabpanel-0').should("exist")
    })

    it("Should display discussion when clicked", () =>{
        cy.contains("Still discussing").click()
        cy.get('#simple-tabpanel-1').should('exist')
    })

    it("Should display finished when clicked", () => {
        cy.contains("Finished answers").click()
        cy.get('#simple-tabpanel-2').should('exist')
    })
})