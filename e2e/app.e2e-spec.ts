import { Ang2mapsPage } from './app.po';

describe('ang2maps App', function() {
  let page: Ang2mapsPage;

  beforeEach(() => {
    page = new Ang2mapsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
