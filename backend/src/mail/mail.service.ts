import { Injectable } from '@nestjs/common';
// import { OneRepoQuery, RepoQuery } from 'src/declare/types';
import { MailRepository } from './mail.repository';
import { Mail } from './entities/mail.entity';
import { CreateMailInput, UpdateMailInput } from './inputs/mail.input';
import * as _ from 'lodash';
import { Mailer, StringFields } from 'src/util/mailer';
import { DustbinRepository } from '../dustbin/dustbin.repository';
import axios from 'axios';
import { Dustbin } from 'src/dustbin/entities/dustbin.entity';
import { Driver } from 'typeorm';
@Injectable()
export class MailService extends Mailer {
  constructor(private readonly mailRepository: MailRepository,
    private readonly dustbinRepository: DustbinRepository) {
    super();
  }

  create(input: CreateMailInput): Promise<Mail> {
    return this.mailRepository.save(input);
  }

  async update(id: number, input: UpdateMailInput): Promise<Mail> {
    const mail = await Mail.findOne({ where: { id } });
    const update = _.merge(mail, _.pickBy(input, _.identity));
    return this.mailRepository.save({ ...update });
  }

  async sendResetPasswordLink(email: string, link: string): Promise<boolean> {
    let mail = await Mail.findOne({ where: { id: 2 } });
    if (!mail) return false;
    mail = _.merge(mail, {
      html_content: this.resolveTemplateFields(mail.html_content, { link }),
      text_content: this.resolveTemplateFields(mail.text_content, { link }),
    });

    return await this.send({ to: email, mail });
  }

  async delete(id: number) {
    const mail = await Mail.findOne({ where: { id } });
    if (!mail) {
      throw new Error('Mail not found');
    }
    await this.mailRepository.delete({ id });
    return mail;
  }

  resolveTemplateFields(content: string, fields: StringFields) {
    let text = _.clone(content);
    const variables: string[] = Object.keys(fields);
    for (let i = 0; i < variables.length; i++) {
      const key: string = variables[i];
      const value: string = fields[key];
      text = text?.replace(new RegExp(`{${key}}`, 'g'), value);
    }
    return text;
  }

  async sendOtpEmail(email: string, otp: string): Promise<boolean> {
    let mail = await Mail.findOne({ where: { id: 1 } }); // Adjust this to fetch the correct mail template

    if (mail == null) return false;
    mail = _.merge(mail, {
      html_content: this.resolveTemplateFields(mail.html_content, { otp }),
      text_content: this.resolveTemplateFields(mail.text_content, { otp }),
    });

    return await this.send({ to: email, mail });
  }

  async sendEmptyMessage(dustbin: Dustbin, email: string) {
    // fetch the dustbin's latitude and longitude based on its id


    // use an external API to get the location name from the latitude and longitude
    const response:any = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${dustbin.latitude}&lon=${dustbin.longitude}`);
    const locationName = response.data.display_name; // adjust this based on the actual response structure

    // fetch the mail template with id 3
    const mail = await this.mailRepository.findOne({where:{id:3}});

    // replace the {location} placeholder in the html_content field with the actual location name
    mail.html_content = mail.html_content.replace('{location}', locationName);

    // send the mail to the driver
    await this.sendMail(mail,email);
  }

  // implement the sendMail function
  async sendMail(mail: Mail, email: string) {
    // use the send function from the parent class to send the mail
    
    await this.send({to:email,mail});
  }
}
