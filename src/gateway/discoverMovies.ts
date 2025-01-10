const axios = require('axios');

export class DiscovermoviesGateway {
    public async getDiscoverMovies(primary_release_year:number): Promise<MovieResponse> {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&primary_release_year=${primary_release_year}=&sort_by=popularity.desc`,{
                headers:{
                    'Authorization': `Bearer ${process.env.API_KEY}`
                }
            });
            //console.log(response.status);
            return response.data as MovieResponse;
        } catch (error) {

            console.error('Error:', error);
            throw error
        }
    }

}


export interface MovieResponse {
    page: number;
    results: Movie[];
}

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
