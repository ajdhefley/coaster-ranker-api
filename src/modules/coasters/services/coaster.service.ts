import * as mysql from 'mysql';
import { Injectable } from '@nestjs/common';
import { Coaster } from '../models/coaster.model';

@Injectable()
export class CoasterService {
  async findAll(): Promise<Coaster[]> {
    const results = await this.executeSelect<Coaster>('SELECT * FROM Coasters');
    return Object.values(results);
  }

  async findOne(url: string): Promise<Coaster> {
    const results = await this.executeSelect<Coaster>('SELECT * FROM Coasters WHERE Url = ? LIMIT 1', [url]);
    const values = Object.values(results);
    return values[0];
  }

  private executeSelect<T>(cmd: string, params?: Array<any>): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const con = this.createConnection();
      con.query(cmd, params, (error, results) => {
        if (error)
          reject(error);
        resolve(results);
      });
      con.end();
    });
  }

  private createConnection() {
    return mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'CoasterRanker'
    });
  }
}