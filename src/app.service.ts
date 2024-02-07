import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<p> Hello and welcome,  <br><br><br><br><br><br><br><br> <a href="http://localhost:3000/api"> Click Here For Swagger Documentation </a> <br><br><br><br><br><br><br><br> Made with love by Relativity<p>';
  }
}
