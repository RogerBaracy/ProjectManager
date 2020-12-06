/// <reference types="cypress" />
context('Tela Inicial', () =>{
    describe('Testando o componente DashBoards', () => {
        it('Testa a rota', () =>{
            cy.visit('/home')
            cy.wait(2000)
        })
    })
    
})