/// <reference types="cypress" />
context('Tela de Resumo de Sprint', () =>{

    it('Testa a rota', () =>{
        cy.visit('/resume')
        cy.wait(2000)
    })
})