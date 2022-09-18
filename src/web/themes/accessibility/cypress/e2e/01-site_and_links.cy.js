describe('Test site and links without logging in', () => {

  it('load the front page', () => {
    cy.visit('/');
    cy.contains('Over a billion people');
  });

  it('verify navigation from front page', () => {
    cy.visit('/');
    cy.get('a').then(($links) => {
      const links = $links.toArray()
        .map((link) => link.getAttribute('href'))
        .filter(link => link.startsWith('/'));
      links.forEach(link => cy.request(link));
    })
  });

  it('verify Finnish that Finnish version loads', () => {
    cy.visit('/');
    cy.contains('Suomeksi').click();
    cy.contains('Yli miljardilla ihmisellä');
  })

});
