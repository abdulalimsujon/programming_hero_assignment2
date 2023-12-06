import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(process.env.PORT, () => {
      console.log(`app listening on port ${process.env.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
