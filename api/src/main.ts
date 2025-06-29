import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';



export interface DocsConfig {
  title: string;
  description: string;
  version: string;
  tags: string[];
}

function createDocsConfig({ title, description, version, tags }: DocsConfig) {
  const doc = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version);

  for (const tag of tags) {
    doc.addTag(tag);
  }

  return doc.build();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors({
    origin: 'http://localhost:5173'
  });

  const timesheetConfig = createDocsConfig({
    title: `Timesheets`,
    description: `Timesheets API`,
    version: '1.0',
    tags: ['timesheets'],
  });

  const timesheetDoc = SwaggerModule.createDocument(app, {
    ...timesheetConfig,
  });

  SwaggerModule.setup('api', app, timesheetDoc);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
