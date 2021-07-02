describe("Make sure site loads", () => {
  beforeEach(() => {
    //IMPORT the env from cypress.json
     const API_KEY = Cypress.env("REACT_APP_MOVIE_API")
     const moviesListUrl =
       "https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&api_key=" + API_KEY

     const configUrl =
       "https://api.themoviedb.org/3/configuration?api_key=" + API_KEY
//intercept and response to the call made in the test instead of reaching the real pi
     cy.intercept(moviesListUrl, {
       fixture: "moviesList",
     })
     cy.intercept(configUrl, {
       fixture: "config",
     })
     cy.visit("http://localhost:3000/")
    //  cy.login()
    // cy.visit("http://localhost:3000/")
  })

  it("Page Loads", () => {
    cy.contains("Filter")

    //with the  @testing-library/cypress from the note, we can now switch get to findAllByTestId
    
    cy.findAllByTestId("movies-list-movie")
      .first()
      .then(($movie) => {
        const movieUrl = $movie.attr("href")
        cy.get("[data-testid=movies-list-movie]").first().click()
        cy.url().should("include", movieUrl)
      })

    expect(true).to.equal(true)
  })

  it("Correct number of movies", () => {
    cy.get("[data-testid=movies-list-movie]").should("have.length", 20)
    cy.get("[data-testid=movies-list-movie]").should("have.length", 20)
  })

  it("Understands chainers", () => {
    cy.get("[data-testid=movies-list-movie]").should("have.length", 20)
    cy.get("[data-testid=movies-list-movie]").should("exist")
    cy.get("[data-testid=movies-loading-movie]").should("not.exist")

    cy.fixture("moviesList").then((jsonData) => {
      console.log("jsonData", jsonData.results[0].title)
      expect(jsonData.results[0].title).to.eq("Skylines")
    })
  })
})
