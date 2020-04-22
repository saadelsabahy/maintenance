import Complains from './complains';

import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { mySchema } from './schema';
const adapter = new SQLiteAdapter({
   dbName: 'maintanance',
   schema: mySchema,
});

const database = new Database({
   adapter,
   modelClasses: [],
   actionsEnabled: true,
});
debugger;
export default database;
