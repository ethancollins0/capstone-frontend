function login(){
    cy.visit('https://capstone-frontend.firebaseapp.com/home')
    cy.get('#signin-email').type('bill@gmail.com')
    cy.get('#signin-password').type('password')
    cy.get('#signin-button').click()
    // cy.wait(2000)
}

function goToPiPage(){
    login()
    // cy.wait(2000)
    cy.get('.add-pi > button > img').first().click()
    // cy.wait(1000)
}

it('Can sign in', () => {
    login()
    // cy.wait(1000)
    cy.url().should('include', '/home')
})

it('Can go to the new pi page', () => {
    goToPiPage()
    cy.url().should('include', '/pi')
})

it('Can create a new pi', () => {
    goToPiPage()
    cy.get('input').type('Pi created by cypress')
    cy.get('select').select('Raspberry Pi 3 A+')
    cy.get('button').click()
    // cy.wait(1000)
    cy.url().should('include', '/home')
    cy.contains('Pi created by cypress')
})

it('Can delete a pi', () => {
    login()
    cy.get('.system > .text-container > img').last().click()
    expect(cy.contains('Pi created by cypress')).to.not.equal(true)
})

it('Can logout', () => {
    login()
    cy.get('#logout').click()
    cy.url().should('include', '/login')
})