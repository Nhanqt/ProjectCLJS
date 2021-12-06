const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "productsDb",
  password: "123456",
  port: 5432,
});

module.exports = {
  async query(text, params) {
    const res = await pool.query(text, params).catch((e) => {
      console.error("error at query " + text);
      throw new Error(e);
    });
    return res;
  },

  async getFirstResult(text, params, client) {
    var result = null;
    var list = await this.getResultList(text, params, client);

    if (list.length !== 0) {
      result = list[0];
    }
    return result;
  },

  async getResultList(text, params, client) {
    var data;
    if (client != null) {
      data = await client
        .query(text, params)
        .then((res) => {
          return res;
        })
        .catch((e) => {
          console.error("error at query " + text);
          throw new Error(e);
        });
    } else {
      data = await this.queryRO(text, params)
        .then((res) => {
          return res;
        })
        .catch((e) => {
          console.error("error at query " + text);
          throw new Error(e);
        });
    }

    return data.rows;
  },

  async getClient() {
    const client = await pool.connect();
    const query = client.query;
    const release = client.release;
    // set a timeout of 5 seconds, after which we will log this client's last query
    const timeout = setTimeout(() => {
      console.error("A client has been checked out for more than 5 seconds!");
      console.error(
        `The last executed query on this client was: ${client.lastQuery}`
      );
    }, 1200000);
    // monkey patch the query method to keep track of the last query executed
    client.query = (...args) => {
      client.lastQuery = args;
      return query.apply(client, args);
    };
    client.release = () => {
      // clear our timeout
      clearTimeout(timeout);
      // set the methods back to their old un-monkey-patched version
      client.query = query;
      client.release = release;
      return release.apply(client);
    };
    return client;
  },
};
