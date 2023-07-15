import { Body, Controller, Delete, HttpCode, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from './jwt.schema';
import { Model } from 'mongoose';

@Controller('jwt')
export class JwtController {
  REFRESH_TOKEN_EXPIRES_IN = 86400 * 7; // 7 days
  ACCESS_TOKEN_EXPIRES_IN = 86400 * 1; // 1 days

  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Token.name) private tokenModel: Model<Token>,
  ) { }

  @Post()
  @HttpCode(201)
  async generateToken(@Body() payload: any): Promise<Token> {
    console.info('Process Generate Token for payload: ', payload);

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: `${this.ACCESS_TOKEN_EXPIRES_IN}s`,
    });
    const refresh_token = await this.jwtService.signAsync(
      {},
      {
        expiresIn: `${this.REFRESH_TOKEN_EXPIRES_IN}s`,
      },
    );

    const createdToken = await this.tokenModel.create({
      access_token,
      refresh_token,
      expires_in: this.ACCESS_TOKEN_EXPIRES_IN,
      refresh_expires_in: this.REFRESH_TOKEN_EXPIRES_IN,
    });

    return createdToken.toJSON();
  }

  @Delete()
  @HttpCode(200)
  async revokeToken(@Body() payload: { access_token: string }): Promise<any> {
    const { access_token } = payload;

    console.info('Delete Token has access_token: ', access_token);

    await this.tokenModel.deleteOne({ access_token });
  }

  @Post('introspect')
  @HttpCode(200)
  async introspectToken(
    @Body() payload: { access_token: string },
  ): Promise<{ active: boolean }> {
    const { access_token } = payload;
    console.info('Introspect Token has access_token: ', access_token);

    const token = await this.tokenModel.findOne({ access_token });

    if (!token) {
      return {
        active: false,
      };
    }

    try {
      await this.jwtService.verifyAsync(token.access_token);
      return {
        active: true,
      };
    } catch (error) {
      console.error('Error when verify access_token: ', error);
      return {
        active: false,
      };
    }
  }
}
