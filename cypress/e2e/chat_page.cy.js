
describe("Chat page Suite", () => {
    before(() => {
        cy.visit("localhost:5173/")
        cy.login("carltest2@gmail.com","1234567890")
        cy.contains("CONVERSATIONS")
    });

    const text = 'Soon random text'
    it("Sending Message in Personnel Channel", () => {
        cy.get('[data-qa="text-channel-name"]').contains("Personnel Channel").click()
        cy.get('[data-testid="message-input"]').type(text)
        cy.get('[data-testid="send"]').click()
        cy.contains(text)
    })

    it("Reply Message in Personnel Channel", () => {
        cy.contains(text)
    })

})