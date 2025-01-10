const axios = require('axios');

export class MoviecreditsGateway {
    public async getMoviecredits(movieid:number):Promise<MovieCredits> {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/movie/'+movieid+'/credits?language=en-US',{
                headers:{
                    'Authorization': `Bearer ${process.env.API_KEY}`
                }
            });
            //console.log(response.data);

            return response.data as MovieCredits;
        } catch (error) {

            console.error('Error:', error);
           return {id:0,cast:[],crew:[]} as MovieCredits;
        }
    }

}

export interface MovieCredits {
    id: number;
    cast: CastMember[];
    crew: CrewMember[];
}

export interface CastMember {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}
export interface CrewMember {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    credit_id: string;
    department: string;
    job: string;
}
