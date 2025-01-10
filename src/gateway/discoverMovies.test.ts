import { DiscovermoviesGateway, MovieResponse, Movie } from './discoverMovies';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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

describe('DiscovermoviesGateway', () => {
    it('should fetch discover movies successfully', async () => {
        mockedAxios.get.mockResolvedValue({ data: mockResponse });

        const gateway = new DiscovermoviesGateway();
        const result = await gateway.getDiscoverMovies(2021);

        expect(result).toEqual(mockResponse);
        expect(mockedAxios.get).toHaveBeenCalledWith(
            'https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&primary_release_year=&sort_by=popularity.desc',
            {
                headers: {
                    'Authorization':  `Bearer ${process.env.API_KEY}`
                }
            }
        );
    });

    it('should handle errors', async () => {
        const mockError = new Error('Network Error');
        mockedAxios.get.mockRejectedValue(mockError);

        const gateway = new DiscovermoviesGateway();

        await expect(gateway.getDiscoverMovies(2021)).rejects.toThrow('Network Error');
        expect(mockedAxios.get).toHaveBeenCalledWith(
            'https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&primary_release_year=&sort_by=popularity.desc',
            {
                headers: {
                    'Authorization':  `Bearer ${process.env.API_KEY}`
                }
            }
        );
    });
});