import axios, { AxiosResponse } from "axios"
import { MovieType} from "../types/Types"
import { setLikedMovies } from "../redux/appSlice"

export const baseApi = axios.create({
    baseURL: "https://api.themoviedb.org",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2M2ZmZTAyMjUzNTcyNDNhOTJmZTczYTg1MTE3M2IyNCIsIm5iZiI6MTcyNzcwMTY1MS4xMjU5Niwic3ViIjoiNjZmYTUyMmIyYzRiZGM5ZGIwNWY5YmY2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.31UqCkTEBblmCytJUptcWWX7REyghPdADugfLiTcpQo'
    }
})

 export const image_url="https://image.tmdb.org/t/p/w500"

class MovieService
{
    BASE_URL="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"

    getAllMovies(): Promise<MovieType[]>{
        return new Promise((resolve: any, reject: any)=>{
            axios.get(`${this.BASE_URL}/movies`)
            .then((response: AxiosResponse<any,any>)=>resolve(response.data))
            .catch((error: any)=>reject(error))
          })

    }

    
    getMovies(): Promise<MovieType[]> {
        return new Promise((resolve, reject) => {
            axios.get(this.BASE_URL, {
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2M2ZmZTAyMjUzNTcyNDNhOTJmZTczYTg1MTE3M2IyNCIsIm5iZiI6MTcyNzcwMTY1MS4xMjU5Niwic3ViIjoiNjZmYTUyMmIyYzRiZGM5ZGIwNWY5YmY2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.31UqCkTEBblmCytJUptcWWX7REyghPdADugfLiTcpQo'
                }
            })
            .then((response: AxiosResponse<any,any>) => resolve(response.data.results))
            .catch((error) => reject(error));
        });
    }
    

    getMoviebyID(movieID: number): Promise<MovieType>
   {
     return new Promise((resolve: any, reject: any)=>{
        
        axios.get(`${this.BASE_URL}/3/movie/${movieID}?language=en-US`)
      .then((response: AxiosResponse<any,any>)=>resolve(response.data))
      .catch((error: any)=>reject(error))
     })
   }

   genres: Record<string, string> = {
    "now_playing": "Şimdi Yayında",
    "popular": "Popüler",
    "top_rated": "Top Sıralama",
    "upcoming": "Yakında"
};

//    movie_genre(genreIDs: number[]): string[] {
   

//     const result = genreIDs.map(genreID => {
//         return this.genres[genreID] || "Bilinmeyen";
//     });

//     return result;
// }

}

export default new MovieService()