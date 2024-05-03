export interface IMovie {
    title: string;
    poster_path: string;
    release_date: string;
    overview: string;
    popularity: number;
    genres: Array<{ id: number, name: string }>;
  }