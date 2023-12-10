<reference types="cypress" />
import React from "react"

describe("Logging in to application", () => {
    before(() => {
        cy.visit("localhost:5173")
    })

    it("Type login credintials", () => {
        cy.get('[data-cy="input-email"]').type('carltest2@gmail.com')
        cy.get('[data-cy="input-password"]').type('1234567890')
        cy.get('[data-cy="button-login"').click()
    })
})