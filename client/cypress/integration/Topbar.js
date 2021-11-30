describe("Se if the topbar reders correcly", () => {
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
    before(() =>{
        cy.visit("courses/DevOps/Day%201")
        cy.get("#topbarContainer").should("exist")
    })

    it("Should render all the courses in the topbar", () => {
        cy.request('http://130.225.170.203/api/allCourses')
        .its('body')
        .should('deep.eq', courses)

        for(let i = 0; i < courses.length; i++){
            cy.contains(courses[i].name).should("exist")
        }
    })

    it("Should redirect to the right board when clicked", () => {
        for(let i = 0; i < courses.length; i++){
            cy.contains(courses[i].name).click()
            cy.contains(courses[i].name+" Day 1")
        }
    })
})