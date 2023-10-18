import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateLinkDto } from './dto/create-link.dto';

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

      return { url, shortUrl: `${ process.env.MYSOFTLINKS_URL }/#/${ shortUrl }` }
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findOne(term: string) {
    if (term.trim().length === 0) throw new BadRequestException('El termino de búsqueda no puede estar vacío.')

    let link: Link = undefined;

    if (term.length === 8) {
      return this.findOneAndUpdateByShortUrl(term);
    }

    if (isValidObjectId(term)) {
      link = await this.linknModel.findById(term);
    }

    if (!link && term) {
      link = await this.linknModel.findOne({ url: term });
    }

    if (!link) throw new NotFoundException('No se encontró el link.')
    
    const { url, shortUrl, visited, createdAt } = link;

    return {
      url,
      shortUrl: `${ process.env.MYSOFTLINKS_URL }/#/${ shortUrl }`,
      visited,
      createdAt
    }
  }
  

  async findOneAndUpdateByShortUrl(shortUrl: string) {
    const link = await this.linknModel.findOne({ shortUrl });
    
    if (!link) throw new NotFoundException('No se encontró el link.')

    const { url } = link;
    
    try {
      await link.updateOne({ visited: link.visited + 1 }, { new: false });
    } catch (error) {
      this.handleErrors(error);
    }

    return {
      url,
      shortUrl: `${ process.env.MYSOFTLINKS_URL }/#/${ shortUrl }`,
    }
  }

  handleErrors(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Ya existe la Url.`)
    }

    console.error(error);
    throw new InternalServerErrorException('No se pudo crear la Url, por favor revisa el log del servidor.')
  }
}
