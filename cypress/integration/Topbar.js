const courses = []
    
before(() =>{
    cy.visit("courses/DevOps/Day%201")
    cy.wait(5000)
    cy.get("#topbarContainer").should("exist")

    cy.intercept(
        {
            method:"GET",
            url:"http://130.225.170.203/api/allCourses"
        },
        [],
        (req) => {
            courses = req.body
        }
    )

})

describe("Se if the topbar reders correcly", () => {

    it("Should render all the courses in the topbar", () => {
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