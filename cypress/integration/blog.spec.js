describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    // user for backend
    const user = {
      name: 'Test user',
      username: 'test',
      password: 'test-pass'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function () {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('logging in', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('test')
      cy.get('#password').type('test-pass')
      cy.get('#login-btn').click()

      cy.contains('Test user logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('test')
      cy.get('#password').type('wrong-pass')
      cy.get('#login-btn').click()

      cy.contains('invalid username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'test',
        password: 'test-pass',
      })
    })

    it('a blog can be created', function () {
      cy.get('#toggle').click()
      cy.get('#add-title').type('Note title')
      cy.get('#add-author').type('Note author')
      cy.get('#add-url').type('Note url')
      cy.get('#create-blog').click()

      cy.contains('created blog')
      cy.get('.success').should('have.css', 'color', 'rgb(0, 128, 0)')

      cy.contains('Note title Note author')
    })

    describe('when blog added', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Note title',
          author: 'Note author',
          url: 'Note url',
        })
      })

      it('like blog', function () {
        cy.get('#show-blog').click()
        cy.contains('0')
        cy.get('#like-blog').click()
        cy.contains('1')
      })

      it('delete blog', function () {
        cy.get('#show-blog').click()
        cy.get('#remove-blog').click()
        cy.get('#blog-list').children().should('have.length', 0)
      })
    })
  })
})
