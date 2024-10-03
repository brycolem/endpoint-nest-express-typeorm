import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './model/application';
import { Note } from './model/note';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) { }

  async getAllApplications(): Promise<Application[]> {
    const applications = await this.applicationRepository.find({ relations: ['notes'] });
    return applications;
  }

  async createApplication(applicationDto: Partial<Application>): Promise<Application> {
    const newApplication = this.applicationRepository.create(applicationDto);
    await this.applicationRepository.save(newApplication);
    return newApplication;
  }

  async getApplication(id: string): Promise<Application> {
    const application = await this.applicationRepository.findOne({ where: { id } });
    if (!application) {
      throw new NotFoundException(`Application with id ${id} not found`);
    }
    return application;
  }

  async updateApplication(id: string, applicationDto: Partial<Application>): Promise<Application> {
    const existingApplication = await this.applicationRepository.findOne({ where: { id } });
    if (!existingApplication) {
      throw new NotFoundException(`Application with id ${id} not found`);
    }

    Object.assign(existingApplication, applicationDto);
    await this.applicationRepository.save(existingApplication);
    return existingApplication;
  }

  async updatePartialApplication(id: string, partialApplicationDto: Partial<Application>): Promise<Application> {
    const existingApplication = await this.applicationRepository.findOne({ where: { id } });
    if (!existingApplication) {
      throw new NotFoundException(`Application with id ${id} not found`);
    }

    Object.assign(existingApplication, partialApplicationDto);
    await this.applicationRepository.save(existingApplication);
    return existingApplication;
  }

  async deleteApplication(id: string): Promise<{ message: string; }> {
    const result = await this.applicationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Application with id ${id} not found`);
    }

    return { message: `Application ${id} deleted` };
  }
}
