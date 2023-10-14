import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';

import { Link } from './entities/link.entity';

@Injectable()
export class LinksService {
  constructor(
    @InjectModel(Link.name)
    private readonly linknModel: Model<Link>
    ) {}

  async create(createLinkDto: CreateLinkDto) {
    try {
      const link = await this.linknModel.create(createLinkDto);
      
      const { url, shortUrl } =  link;

      return { url, shortUrl: `${ process.env.MYSOFTLINKS_URL }/${ shortUrl }` }
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findOneByShortUrl(shortUrl: string) {
    const link = await this.linknModel.findOne({ shortUrl });
    
    if (!link) throw new NotFoundException('No se encontró el link.')

    const { url } = link;

    await this.updateAfterConsulting(link);

    return {
      url,
      shortUrl: `${ process.env.MYSOFTLINKS_URL }/${ shortUrl }`,
    }
  }

  async updateAfterConsulting(updateLinkDto: UpdateLinkDto) {
    updateLinkDto.visited = updateLinkDto.visited + 1;

    await this.linknModel.updateOne(updateLinkDto, { new: false });
  }

  handleErrors(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Ya existe la Url.`)
    }

    console.error(error);
    throw new InternalServerErrorException('No se pudo crear la Url, por favor revisa el log del servidor.')
  }
}
