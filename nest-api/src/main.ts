import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as hbs from 'hbs';
import { AppDataSource } from './database/data-source';

async function bootstrap() {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error during Data Source initialization", err);
    process.exit(1); 
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir('./views');

  
  hbs.registerHelper('formatDate', function (date: Date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  });

  app.setViewEngine('hbs');

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
