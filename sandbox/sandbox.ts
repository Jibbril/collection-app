import { config } from 'dotenv';
config({
  path: '.env.local',
});

import { connect } from '@planetscale/database';

const dbConfig = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

const conn = connect(dbConfig);
const results = conn
  .execute(
    "insert into Collection (id,slug,name,description,userId) values ('b65cb1bb-b5c5-4a98-90da-41794694087c','second-new-one', 'Second New One', 'Created from the rebuild!','user_2PPmBCP9rvvmBgxeIFNyLwi8CwM')"
  )
  .then((res) => {
    console.log(res);
  });
