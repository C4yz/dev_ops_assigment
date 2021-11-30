describe("Requests for courses", () => {
    it("Should return all courses", () => {
        cy.request({
            url: "http://130.225.170.203/api/allCourses",
            followRedirect: false,
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it("Should return one course", () => {
        cy.request({
            url: "http://130.225.170.203/api/getOneCourse/1",
            followRedirect: false,
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    })
})

describe("Requests for days", () => {
    it("Should return all days for one course", () => {
        cy.request({
            url: "http://130.225.170.203/api/getDaysForCourse/1",
            followRedirect: false,
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    })
})

describe("Requests for cards", () => {
    it("Sould return all cards from one day", () => {
        cy.request({
            url: "http://130.225.170.203/api/GetCardsFromdDay/1",
            followRedirect: false,
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it("Should post a card to one day", () => {
        cy.request({
            method: "POST",
            url: "http://130.225.170.203/api/CreateCard",
            body: {
                desc: "Tester API call",
                title: "Tester API call gennem cypress",
                dayid: 1,
                username: "Test User"
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it("Should update the card status", () => {
        cy.request({
            method: "PUT",
            url: "http://130.225.170.203/api/UpdateCardStatus",
            body: {
                cardid: 73,
                status: 2,
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    })
})

describe("Request for comments", () => {
    it("Should return all comments for one card", () => {
        cy.request({
            url: "http://130.225.170.203/api/getCommentsForOneCard/40",
            followRedirect: false,
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it("Should post a comment to one card", () => {
        cy.request({
            method: "POST",
            url: "http://130.225.170.203/api/CreateComment",
            body: {
                comment: "Tester comments API call",
                userame: "Test User",
                cardid: 40
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    })
})

