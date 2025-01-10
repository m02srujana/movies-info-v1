import { DiscovermoviesGateway, MovieResponse } from "../gateway/discoverMovies";
import { MoviecreditsGateway } from "../gateway/movieCredit";

import { MovieInfo } from "../model/movieInfo";

export class MovieinfoService {
    private discovermoviesGateway: DiscovermoviesGateway;
    private moviecreditsGateway: MoviecreditsGateway;
    constructor() {
        this.discovermoviesGateway= new DiscovermoviesGateway();
        this.moviecreditsGateway=  new MoviecreditsGateway();
    }
    public async getMovieinfo(year:number) {
        try {
            const movieresult:MovieResponse = await this.discovermoviesGateway.getDiscoverMovies(year);
           

            const finalResponse= new Array<MovieInfo>()
            for (const data of movieresult.results) {
                const movieInfo = new MovieInfo(data.title, data.release_date, data.vote_average);
                const resCredits = await this.moviecreditsGateway.getMoviecredits(data.id);
                //console.log("before>>>>>>>>>>",resCredits)
                movieInfo.editors= resCredits.crew.filter(a => a.known_for_department == 'Editing')
                .map(editor => {
                    //console.log("editor>>>>>>>>>>",editor)
                    return editor.name
                });


                finalResponse.push(movieInfo)
            };
            //console.log("finalResponse>>>>>>>>>>",finalResponse)
            return  finalResponse
        } catch (e) {
            console.error(e)
            throw new Error('internal server error')
        }
    }
}