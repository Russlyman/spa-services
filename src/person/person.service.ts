import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './person.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  async findOne(userId: number, personId: number) {
    const person = await this.personRepository.findOne({
      select: {
        id: true,
        displayname: true,
        details: { type: true, number: true },
        group: {},
      },
      where: [
        {
          id: personId,
          group: {
            owner: -1,
          },
        },
        {
          id: personId,
          group: {
            owner: userId,
          },
        },
      ],
      relations: { details: true, group: true },
    });

    if (!person) {
      throw new BadRequestException('Person not found!');
    }

    const details = person.details.map((detail) => ({
      type: detail.type,
      number: `Dial:${detail.type === 'internal' ? '' : '9'}${detail.number}`,
    }));

    return { name: person.displayname, details };
  }
}
