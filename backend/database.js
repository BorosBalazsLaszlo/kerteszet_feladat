import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.db");

const DbInit = async () => {
  await DbRun(
    "CREATE TABLE IF NOT EXISTS Novenyek (id INTEGER PRIMARY KEY AUTOINCREMENT ,nev text, evelo bool, kategoria text, ar integer)"
  );
};

function DbQuery(sql, params) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function DbRun(sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID });
      }
    });
  });
}

export {DbQuery, DbInit, DbRun, db};