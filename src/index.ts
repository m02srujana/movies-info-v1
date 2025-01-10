import express, { Request, Response } from 'express';
import { MovieinfoService } from './service/movieinfoService';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.get('/movies-info', async (req: Request, res: Response) => {

  try {
    const year = parseInt(req.query.year as string, 10);
    // Set headers
    res.set({
      'Content-Type': 'application/json',
    });
    if (isNaN(year) || year.toString().length !== 4) {
      res.status(400).json({'message':'Invalid YEAR parameter'});
    }else{
    let movieinfoService = new MovieinfoService();
    const mresponse = await movieinfoService.getMovieinfo(year);

    // Send the response with the fetched data
    res.status(200).json(mresponse)
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
