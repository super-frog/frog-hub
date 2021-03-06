"use strict";
const Connection = require('xiaolan-db').Connection('default').conn;
const TableName = "frog_hub_project";

class FrogHubProject {

  constructor(data={}){
    this.id = (data.id||data.id)||0;
    this.name = (data.name||data.project_name)||'foo';
    this.status = (data.status||data.status)||1;
    this.updateTime = (data.updateTime||data.update_time)||0;
  }

  static fetchById(v){
    let sql = 'select * from frog_hub_project where id=:v limit 1';
    //@row
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{v:v}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          if(r[0]){
            resolved(new FrogHubProject(r[0]));
          }else{
            resolved(null);
          }
        }
      });
    });
  }

  static fetchByStatus(status, page=1, pageSize=10){
    let sql = 'select * from frog_hub_project where status=:status order by id desc limit '+((page-1)*pageSize)+','+pageSize+'';
    //@list
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{status: status}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new FrogHubProject(r[k]));
          }
          resolved(result);
        }
      });
    });
  }

  static fetchByUpdateTime(updateTime, page=1, pageSize=10){
    let sql = 'select * from frog_hub_project where update_time=:updateTime order by id desc limit '+((page-1)*pageSize)+','+pageSize+'';
    //@list
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{updateTime: updateTime}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new FrogHubProject(r[k]));
          }
          resolved(result);
        }
      });
    });
  }

  static fetchByName(name, page=1, pageSize=10){
    let sql = 'select * from frog_hub_project where project_name=:name order by id desc limit '+((page-1)*pageSize)+','+pageSize+'';
    //@row
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{name: name}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          if(r[0]){
            resolved(new FrogHubProject(r[0]));
          }else{
            resolved(null);
          }
        }
      });
    });
  }

  static fetchByAttr(data={}, page=1, pageSize=10){
    let allowKey = ['id','status','update_time','project_name'];
    let sql = 'select * from frog_hub_project where 1 ';
    if(Object.keys(data).length===0){
      throw new Error('data param required');
    }
    for(let k in data){
      let field = '';
      if(allowKey.includes(k)){
        field = k;
      }else if(allowKey.includes(KeyMap[k])){
        field = KeyMap[k];
      }else{
        throw new Error('Not Allow Fetching By [ "'+k+'" ]');
      }
      sql += ' and '+field+'=:'+k+'';
    }
    sql += ' order by id desc limit '+((page-1)*pageSize)+','+pageSize;
    //@list
    return new Promise((resolved, rejected)=>{
      Connection.query({sql:sql,params:data}, (e, r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new FrogHubProject(r[k]));
          }
          resolved(result);
        }
      });
    });
  }

  static raw(sql='',params={}){
    if(!sql.includes('limit')){
      throw new Error('raw sql must with paging');
    }
    //@list
    return new Promise((resolved, rejected)=>{
      Connection.query({sql:sql,params:params}, (e, r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new FrogHubProject(r[k]));
          }
          resolved(result);
        }
      });
    });
  }
    
  data(){
    let obj = {};
    for(let k in FieldMap){
      obj[FieldMap[k]] = this[FieldMap[k]];
    }
    return obj;
  }

  row(){
    let row = {};
    for(let k in FieldMap){
      row[k] = this[FieldMap[k]];
    }
    return row;
  }

  validate(){
    if(this.name !== null && !(typeof this.name==='string' && this.name.length>=0 && this.name.length<=64)){
      throw new Error('attribute name(project_name) must be a string length in [0,64]');
    }
    if(this.status !== null && !(typeof this.status==='number' && this.status>=0 && this.status<=255)){
      throw new Error('attribute status(status) must be a number in [0,255]');
    }
    if(this.updateTime !== null && !(typeof this.updateTime==='number' && this.updateTime>=0 && this.updateTime<=18014398509481982)){
      throw new Error('attribute updateTime(update_time) must be a number in [0,18014398509481982]');
    }
  }

  save(force=false){
    if(force){
      try{
        this.validate();
      }catch(e){
        return Promise.resolve(Object.assign(error.BAD_REQUEST, {message: error.BAD_REQUEST.message+':'+e.message}));
      }
    }
    //@true
    return new Promise((resolved, rejected) => {
      let data = this.data();
      let sql = `insert into ${TableName} set `;
      let fields = [];
      for(let k in data){
        if(k==='id' || data[k]===null){
          continue;
        }
        fields.push(`${KeyMap[k]}=:${k}`);
      }
      sql += fields.join(',');
      Connection.query({sql: sql,params:this.data()},(e, r) => {
        if(e) {
          rejected(e);
        }else{
          this.id = r.insertId;
          resolved(true);
        }
      });
    });
  }

  update(force=false){
    if(force){
      this.validate();
    }
    //@true
    return new Promise((resolved, rejected) => {
      let sql = `update ${TableName} set `;
      let data = this.data();
      let fields = [];
      for(let k in data){
        if(k==='id' || data[k]===null){
          continue;
        }
        fields.push(`${KeyMap[k]}=:${k}`);
      }
      sql += fields.join(',');
      sql += ` where id=:id`;
      Connection.query({sql: sql,params:data},(e, r) => {
        if(e) {
          rejected(e);
        }else{
          resolved(true);
        }
      });
    });
  }

  static create(data){
    //@this
    return new FrogHubProject(data);
  }

}

const FieldMap = {
  id: 'id',
  project_name: 'name',
  status: 'status',
  update_time: 'updateTime',
};

const KeyMap = {
  id: 'id',
  name: 'project_name',
  status: 'status',
  updateTime: 'update_time',
};


module.exports = FrogHubProject;
