const days = [
    {
        "name": "Day 1",
        "dayid": 1,
        "courseid": 1
    },
    {
        "name": "Day 2",
        "dayid": 8,
        "courseid": 1
    },
    {
        "name": "Mandatory 1",
        "dayid": 9,
        "courseid": 1
    },
    {
        "name": "Mandatory 2",
        "dayid": 13,
        "courseid": 1
    },
    {
        "name": "Christians Hyggekrog",
        "dayid": 14,
        "courseid": 1
    },
    {
        "name": "Exam Discussion",
        "dayid": 15,
        "courseid": 1
    }
]
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
    it("Should have the correcnt number of days", () => {
        cy.request("http://130.225.170.203/api/getDaysForCourse/1")
        .its('body')
        .should('deep.eq', days)

        for(let i = 0; i < days.length; i++){
            cy.contains(days[i].name).should("exist")
        }
    })
})

describe("Se if the days change", () => {
    it("Should render the right day in board", () => {
        for (let i = 0; i < days.length; i++) {
            cy.contains(days[i].name).click()
            cy.contains("DevOps "+days[i].name).should("exist")
        }
    })
});