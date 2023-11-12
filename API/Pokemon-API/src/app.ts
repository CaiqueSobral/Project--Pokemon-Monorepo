import express from 'express';
import { router } from './routes.ts';

const app = express();

app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Pokemon API listening on port ${PORT}`));
