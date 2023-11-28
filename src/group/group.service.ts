import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/group/group.entity';
import { Like, Repository } from 'typeorm';
import { Person } from 'src/person/person.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  // Maybe use transactions?
  async findOne(
    userId: number,
    groupId: number,
    page: number,
    search?: string,
  ) {
    const group = await this.groupRepository.findOne({
      select: { name: true },
      where: [
        { owner: -1, id: groupId },
        { owner: userId, id: groupId },
      ],
    });

    // Abort if no group is found or user doesn't have permission.
    if (!group) {
      throw new BadRequestException('Group not found!');
    }

    const people = await this.personRepository.find({
      select: { id: true, displayname: true },
      where: {
        groupid: groupId,
        displayname: search ? Like(`%${search}%`) : undefined,
      },
      take: 100,
      skip: page * 100,
    });

    const maxPage = Math.max(Math.ceil(people.length / 100) - 1, 0);

    // Abort if select page is greater than max possible.
    if (page > maxPage) {
      throw new BadRequestException('Page does not exist!');
    }

    const peopleMapped = people.map((person) => ({
      name: person.displayname,
      id: String(person.id),
    }));

    return {
      name: group.name,
      maxPage,
      people: peopleMapped,
    };
  }

  async findAll(userId: number) {
    const groups = await this.groupRepository.find({
      select: { id: true, name: true },
      where: [{ owner: -1 }, { owner: userId }],
    });

    if (!groups) {
      throw new BadRequestException('No groups found!');
    }

    return groups.map((group) => ({
      name: group.name,
      id: String(group.id),
    }));
  }
}
