import { Injectable } from '@nestjs/common';
import { OtpRepository } from './otp.repository';
import { Otp, OtpType } from './entities/otp.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class OtpService {
  constructor(private readonly otpRepository: OtpRepository) {}

  /**
   * Create and save an OTP object to the database.
   * @param {User} user - The user for whom the OTP is created.
   * @param {OtpType} otpType - The type of the OTP (e.g., PHONE_VERIFICATION).
   * @returns The created OTP object.
   */
  async create(user: User, otpType: OtpType): Promise<Otp> {
    const otpCode = String(Math.floor(100000 + Math.random() * 900000));
    const expiresIn = new Date(Date.now() + 15 * 60_000);

    // Create the OTP object without using the repository
    const otp = new Otp();
    otp.code = otpCode;
    otp.operation = otpType;
    otp.user = user;
    otp.expires_in = expiresIn;
    return await this.otpRepository.save(otp);
  }

  getOne(otpCode: string, user: User, operation: OtpType): Promise<Otp | null> {
    return this.otpRepository.findOne({
      where: { code: otpCode, user: { id: user.id }, operation },
    });
  }

  async update(otp: Otp): Promise<boolean> {
    await this.otpRepository.save(otp);
    return true;
  }
}
