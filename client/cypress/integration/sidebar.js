describe("Se if new question renders corectly", () => {
    it("Should post a question to the database", () => {
        cy.visit("courses/DevOps/Day%201")
        cy.get("#sidebarContainer").should("exist")
    });

    it("Should ask a new question", () => {
        cy.contains("Ask a new Question").click()
        cy.contains("New question").should('exist')

        cy.get("input[id='TitleInput']").type("Testing the post function Title again")
        cy.get("textarea[id='DescriptionInput']").type("Testing the post function Desc again")
        cy.get("button[id='postButton']").click()
        cy.contains("Testing the post function Title").should("exist")
    })

    it("Should cancel ask a new question", () => {
        cy.contains("Ask a new Question").click()
        cy.contains("New question").should('exist')

        cy.get("input[id='TitleInput']").type("Testing the post function Title")
        cy.get("textarea[id='DescriptionInput']").type("Testing the post function Desc")
        cy.get("button[id='cancelButton']").click()
        cy.contains("New question").should('exist')
    })
});

describe("Se if it renders correctly", () => {

    const days = []

    before(() => {
        cy.intercept(
            {
                method:"GET",
                url:"http://130.225.170.203/api/getDaysForCourse/1"
            },
            [],
            (req) => {
                days = req.body
            }
        )
    })

    it("Should have the correcnt number of days", () => {
        for (let i = 0; i < days.length; i++) {
            cy.contains(days[i].name).should("exist")
            
        }
    })

    it("Should render the right day in board", () => {
        for (let i = 0; i < days.length; i++) {
            cy.contains(days[i].name).click()
            cy.contains("DevOps "+days[i].name).should("exist")
        }
    })
})
