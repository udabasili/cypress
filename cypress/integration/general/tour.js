describe("Make sure site loads", () => {
  beforeEach(() => {
    // const moviesListUrl =
    //   "https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&api_key=65e043c24785898be00b4abc12fcdaae"

    // const configUrl =
    //   "https://api.themoviedb.org/3/configuration?api_key=65e043c24785898be00b4abc12fcdaae"

    // cy.intercept(moviesListUrl, {
    //   fixture: "moviesList",
    // })
    // cy.intercept(configUrl, {
    //   fixture: "config",
    // })
    cy.visit("http://localhost:3000/")
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
