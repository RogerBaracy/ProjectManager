/// <reference types="cypress" />
context('Tela de Import de CSV', () =>{

    it('Testa a rota', () =>{
        cy.visit('/import')
        cy.wait(2000)
    })
})