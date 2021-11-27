
describe("Se if the board component renders", () => {
    const courses = [
        {
            "name": "DevOps",
            "number": 65282,
            "courseid": 1
        },
        {
            "name": "Innovation Pilot",
            "number": 62999,
            "courseid": 5
        },
        {
            "name": "Network Security",
            "number": 62530,
            "courseid": 8
        },
        {
            "name": "Calculus and Algebra 2",
            "number": 1920,
            "courseid": 17
        },
        {
            "name": "Engineering Economy",
            "number": 42415,
            "courseid": 23
        },
        {
            "name": "Algorithms and Datastructures 2",
            "number": 2110,
            "courseid": 12
        }
    ]

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

    it("should render correctly", () => {
        cy.visit("courses/DevOps/Day%201")
        cy.get("#boardContainer").should("exist")
    })

    it("should have the right data", () => {
        cy.request('http://130.225.170.203/api/allCourses')
        .its('body')
        .should('deep.eq', courses)

        for(let i = 0; i < days.length; i++){
            cy.contains(courses[i].name).should("exist")
        }
    })

    it("Should have the correcnt number of days", () => {
        cy.request("http://130.225.170.203/api/getDaysForCourse/1")
        .its('body')
        .should('deep.eq', days)

        for(let i = 0; i < days.length; i++){
            cy.contains(days[i].name).should("exist")
        }
    })
    
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
});