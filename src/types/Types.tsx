
export interface MovieType 
{
    backdrop_path:string,
    poster_path: string,
    title:string,
    overview:string,
    vote_count:number,
    original_language:string,
    id: number,
    release_date: string,
    genre_ids: number[]
}

export interface UserType{
    username: string,
    password:string,
    id: string
}

export interface MovieDetailType extends MovieType
{
    backdrop_path:string,
    poster_path: string,
    genres: Genre[],
    overview:string,
    release_date: string,
    vote_count:number,
    popularity: number,
    original_language:string,
    id: number,
    vote_average: number,
    title: string,
    liked: boolean,
    genre_ids: number[],
    watched:boolean
}

export type Genre = {
    id: number;
    name: string;
  }

