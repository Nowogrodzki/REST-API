import { Pool } from "pg";
import { Movie, IList } from "../typescript/interface";

class DB {
  pool: Pool;
  constructor() {
    this.pool = new Pool();
  }

  async listMovies(id?: number): Promise<IList> {
    if (id) {
      const { rows } = await this.pool.query("SELECT * FROM movies WHERE id = $1", [id]);
      return { data: rows };
    }
    const { rows } = await this.pool.query("SELECT * FROM movies");
    return { count: rows.length, data: rows };
  }

  async listComments(id?: number): Promise<IList> {
    if (id) {
      const { rows } = await this.pool.query(
        "SELECT id, title, comment FROM movies WHERE id = $1",
        [id]
      );
      return { data: rows };
    }
    const { rows } = await this.pool.query("SELECT id, title, comment FROM movies");
    return { count: rows.length, data: rows };
  }

  async insertComment(comment: string, id: number) {
    const { rowCount } = await this.pool.query(`UPDATE movies SET comment = $1 WHERE id = $2`, [
      comment,
      id,
    ]);
    if (!rowCount) {
      throw new Error(`Cannot add comment, movie with that id does not exists,  id - ${id}`);
    }
  }

  async insertMovie(data: Movie) {
    await this.checkIfMovieExists(data.Title);
    const keys = Object.keys(data).map((i) => i.toLowerCase());
    const values: Array<string> = Object.values(data);
    const valuesOrder = new Array(keys.length).fill("$").map((d, i) => `${d}${++i}`);
    await this.pool.query(`INSERT INTO movies (${keys}) VALUES (${valuesOrder})`, values);
  }

  async checkIfMovieExists(title: string) {
    const { rows } = await this.pool.query(`SELECT id FROM movies WHERE title = $1`, [title]);
    if (rows.length) {
      throw new Error(`The movie with this title exists, title - ${title}, id - ${rows[0].id}`);
    }
  }
}

const pool = new DB();

export { DB, pool };
