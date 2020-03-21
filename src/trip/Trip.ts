export default class Trip {
  public popularity: number = 0;

  public constructor(popularity?: number) {
    if (popularity) {
      this.popularity = popularity;
    }
  }
}
