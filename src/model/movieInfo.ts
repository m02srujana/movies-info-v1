export class MovieInfo{

    title:string
    releaseDate:string
    voteAverage:number
    editors?:string[]

    constructor(title:string,releaseDate:string,voteAverage:number){
        this.title=title;
        this.releaseDate=releaseDate;
        this.voteAverage=voteAverage;
        

    }

}