import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { Config } from '../config/env';
import { Logger } from '../logger/Logger';

export class Database {
  private static dbInstance: sqlite3.Database | null = null;

  public static getDB(): sqlite3.Database {
    if (!this.dbInstance) {
      const dbFile = Config.DB_PATH;
      const isNew = !fs.existsSync(dbFile);

      this.dbInstance = new sqlite3.Database(dbFile, (err) => {
        if (err) {
          Logger.error('Failed to connect to SQLite Database', err);
          throw err;
        }
        Logger.info(`Connected to SQLite Database at: ${dbFile}`);
      });

      if (isNew) {
        this.initializeSchema();
      }
    }
    return this.dbInstance;
  }

  public static initializeSchema(): void {
    const schemaPath = path.resolve(__dirname, 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
      const db = this.getDB();
      db.exec(schemaSql, (err) => {
        if (err) {
          Logger.error('Failed to apply database schema', err);
        } else {
          Logger.info('Database relational schema initialized successfully.');
        }
      });
    }
  }

  public static query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.getDB().all(sql, params, (err, rows) => {
        if (err) {
          Logger.error(`Database query failed: ${sql}`, err);
          reject(err);
        } else {
          resolve(rows as T[]);
        }
      });
    });
  }

  public static getOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
    return new Promise((resolve, reject) => {
      this.getDB().get(sql, params, (err, row) => {
        if (err) {
          Logger.error(`Database getOne failed: ${sql}`, err);
          reject(err);
        } else {
          resolve((row as T) || null);
        }
      });
    });
  }

  public static run(sql: string, params: any[] = []): Promise<{ lastID: number; changes: number }> {
    return new Promise((resolve, reject) => {
      this.getDB().run(sql, params, function (err) {
        if (err) {
          Logger.error(`Database run statement failed: ${sql}`, err);
          reject(err);
        } else {
          resolve({ lastID: this.lastID, changes: this.changes });
        }
      });
    });
  }
}
