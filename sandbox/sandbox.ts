import { config } from 'dotenv'
config();

import { connect } from '@planetscale/database'

const dbConfig = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
}

const conn = connect(dbConfig)
const results = conn.execute('select * from Collection').then((res) => {
  console.log(res)
});
