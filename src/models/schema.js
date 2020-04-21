import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const mySchema = appSchema({
   version: 1,
   tables: [
      tableSchema({
         name: 'complains',
         columns: [
            { name: 'complain_id', type: 'string' },
            { name: 'Contractor_id', type: 'string' },
            { name: 'Status_id', type: 'string' },
            { name: 'Cretaed_on', type: 'string' },
            { name: 'Vehicle_id', type: 'string' },
            { name: 'Plate_umber', type: 'string' },
            { name: 'Vehicle_type', type: 'string' },
         ],
      }),
      tableSchema({
         name: 'dashboard',
         columns: [
            { name: 'waitPerview', type: 'number' },
            { name: 'waitApproval', type: 'number' },
            { name: 'waitExcution', type: 'number' },
            { name: 'solved', type: 'number' },
            { name: 'rejected', type: 'number' },
         ],
      }),
   ],
});
