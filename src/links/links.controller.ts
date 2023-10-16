import { Controller, Get, Post, Body, Param/*, HttpCode, HttpStatus*/ } from '@nestjs/common';

import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  // @HttpCode(HttpStatus.CREATED)
  create(@Body() createLinkDto: CreateLinkDto) {
    return this.linksService.create(createLinkDto);
  }

  @Get(':shortUrl')
  // @HttpCode(HttpStatus.OK)
  findOneAndUpdateByShortUrl(@Param('shortUrl') shortUrl: string) {
    return this.linksService.findOneAndUpdateByShortUrl(shortUrl);
  }

  // @Patch(':shortUrl')
  // update(@Param('shortUrl') shortUrl: string, @Body() updateLinkDto: UpdateLinkDto) {
  //   return this.linksService.update(shortUrl, updateLinkDto);
  // }
}
