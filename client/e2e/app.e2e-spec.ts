import { PanDogCliPage } from './app.po';

describe('pan-dog-cli App', () => {
  let page: PanDogCliPage;

  beforeEach(() => {
    page = new PanDogCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
