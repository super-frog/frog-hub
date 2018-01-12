/**
 * Created by lanhao on 2017/9/21.
 */

'use strict';
const {Field, Table, Migrate} = require('xiaolan-db');

module.exports = new Table('frog_hub_project', {
  id:Field.name('id').bigint(true).primary().AI().comment('p id'),
  name: Field.name("project_name").varchar(64).allowNull().default("foo").uniq('u_project_name').comment("name of project"),
  updateTime:Field.name('update_time').bigint(true).index()
});
