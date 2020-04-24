// model/Post.js
import { Model } from '@nozbe/watermelondb';
import { field, date, children } from '@nozbe/watermelondb/decorators';
export default class Complains extends Model {
   static table = 'complains';
}
