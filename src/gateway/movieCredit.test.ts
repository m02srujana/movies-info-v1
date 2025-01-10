import { MoviecreditsGateway } from './movieCredit';
import axios from 'axios';
import { MovieCredits } from './movieCredit';
import dotenv from 'dotenv';
dotenv.config();
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('MoviecreditsGateway', () => {
    it('should fetch movie credits successfully', async () => {
        const mockResponse: MovieCredits = {
            id: 1,
            cast: [
                { known_for_department: 'Editing', name: 'Editor 1', adult: false, gender: 2, id: 1, original_name: 'Editor 1', popularity: 1.0, profile_path: '', cast_id: 1, character: '', credit_id: '', order: 1 },
                { known_for_department: 'Editing', name: 'Editor 2', adult: false, gender: 2, id: 2, original_name: 'Editor 2', popularity: 1.0, profile_path: '', cast_id: 2, character: '', credit_id: '', order: 2 }
            ],
            crew: [
                { adult: false, gender: 0, id: 4227863, known_for_department: 'Production', name: 'Donis Pratama', original_name: 'Donis Pratama', popularity: 0.001, profile_path: null, credit_id: '65f86b84e21023017ef02b2c', department: 'Production', job: 'Casting Director' },
                { adult: false, gender: 1, id: 4227864, known_for_department: 'Directing', name: 'Jane Doe', original_name: 'Jane Doe', popularity: 0.5, profile_path: null, credit_id: '65f86b84e21023017ef02b2d', department: 'Directing', job: 'Director' }
            ]
        };

        mockedAxios.get.mockResolvedValue({ data: mockResponse });

        const gateway = new MoviecreditsGateway();
        const result = await gateway.getMoviecredits(1);

        expect(result).toEqual(mockResponse);
        expect(mockedAxios.get).toHaveBeenCalledWith(
            'https://api.themoviedb.org/3/movie/1/credits?language=en-US',
            {
                headers: {
                    'Authorization': `Bearer ${process.env.API_KEY}`
                }
            }
        );
    });

    it('should handle errors', async () => {
        const mockError = new Error('Network Error');
        mockedAxios.get.mockRejectedValue(mockError);

        const gateway = new MoviecreditsGateway();

        const result = await gateway.getMoviecredits(1);

        expect(result).toEqual({ id: 0, cast: [], crew: [] });
        expect(mockedAxios.get).toHaveBeenCalledWith(
            'https://api.themoviedb.org/3/movie/1/credits?language=en-US',
            {
                headers: {
                    'Authorization': `Bearer ${process.env.API_KEY}`
                }
            }
        );
    });
});