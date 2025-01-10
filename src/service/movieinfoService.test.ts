import { MovieinfoService } from './movieinfoService';
import { DiscovermoviesGateway,MovieResponse ,Movie} from '../gateway/discoverMovies';
import { MoviecreditsGateway,MovieCredits } from '../gateway/movieCredit';
import { MovieInfo } from '../model/movieInfo';

jest.mock('../gateway/discoverMovies');
jest.mock('../gateway/movieCredit');


const mockMovies: Movie[] = [
    {
        adult: false,
        backdrop_path: '/path/to/backdrop.jpg',
        genre_ids: [28, 12, 16],
        id: 1,
        original_language: 'en',
        original_title: 'Movie 1',
        overview: 'Overview of Movie 1',
        popularity: 100.0,
        poster_path: '/path/to/poster.jpg',
        release_date: '2021-01-01',
        title: 'Movie 1',
        video: false,
        vote_average: 8.0,
        vote_count: 1000
    },
    {
        adult: false,
        backdrop_path: '/path/to/backdrop2.jpg',
        genre_ids: [28, 12, 16],
        id: 2,
        original_language: 'en',
        original_title: 'Movie 2',
        overview: 'Overview of Movie 2',
        popularity: 90.0,
        poster_path: '/path/to/poster2.jpg',
        release_date: '2021-02-01',
        title: 'Movie 2',
        video: false,
        vote_average: 7.5,
        vote_count: 800
    }
];

const mockResponse: MovieResponse = {
    page: 1,
    results: mockMovies
};

const MockDiscovermoviesGateway = DiscovermoviesGateway as jest.MockedClass<typeof DiscovermoviesGateway>;
const MockMoviecreditsGateway = MoviecreditsGateway as jest.MockedClass<typeof MoviecreditsGateway>;
const mockDiscovermoviesGateway = new MockDiscovermoviesGateway();
const mockMoviecreditsGateway = new MockMoviecreditsGateway();
const movieinfoService = new MovieinfoService();
describe('MovieinfoService', () => {
    
    it('should fetch movie info successfully', async () => {
        const mockDiscoverMoviesResponse: MovieResponse =mockResponse

        const mockMovieCreditsResponse: MovieCredits = {
            id: 1,
            cast: [
                { known_for_department: 'Editing', name: 'Editor 1', adult: false, gender: 2, id: 1, original_name: 'Editor 1', popularity: 1.0, profile_path: '', cast_id: 1, character: '', credit_id: '', order: 1 },
                { known_for_department: 'Editing', name: 'Editor 2', adult: false, gender: 2, id: 2, original_name: 'Editor 2', popularity: 1.0, profile_path: '', cast_id: 2, character: '', credit_id: '', order: 2 }
            ],
            crew: [
                { adult: false, gender: 0, id: 4227863, known_for_department: 'Editing', name: 'Donis Pratama', original_name: 'Donis Pratama', popularity: 0.001, profile_path: null, credit_id: '65f86b84e21023017ef02b2c', department: 'Production', job: 'Casting Director' },
                { adult: false, gender: 1, id: 4227864, known_for_department: 'Directing', name: 'Jane Doe', original_name: 'Jane Doe', popularity: 0.5, profile_path: null, credit_id: '65f86b84e21023017ef02b2d', department: 'Directing', job: 'Director' }
            ]
        };
        (mockDiscovermoviesGateway.getDiscoverMovies as jest.Mock).mockResolvedValue(mockDiscoverMoviesResponse);
        (mockMoviecreditsGateway.getMoviecredits as jest.Mock).mockResolvedValue(mockMovieCreditsResponse);

        const result = await movieinfoService.getMovieinfo(2021);

        expect(result).toEqual([
            new MovieInfo('Movie 1', '2021-01-01', 8.0),
            new MovieInfo('Movie 2', '2021-02-01', 7.5)
        ]);
        expect(mockDiscovermoviesGateway.getDiscoverMovies).toHaveBeenCalled();
        expect(mockMoviecreditsGateway.getMoviecredits).toHaveBeenCalledTimes(2);
    });

    it('should handle errors', async () => {
        const mockError = new Error('Network Error');
        (mockDiscovermoviesGateway.getDiscoverMovies as jest.Mock).mockRejectedValue(mockError);

        await expect(movieinfoService.getMovieinfo(2021)).rejects.toThrow('internal server error');
        expect(mockDiscovermoviesGateway.getDiscoverMovies).toHaveBeenCalled();
    });

});