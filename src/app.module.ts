// import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
/* Por el momento se quitará la página para evitar vulnerabilidades */
// import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';

import { LinksModule } from './links/links.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public'),
    // }),
    MongooseModule.forRoot(process.env.MONGODB),
    LinksModule
  ],
})
export class AppModule {}