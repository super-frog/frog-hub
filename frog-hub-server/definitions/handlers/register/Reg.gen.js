"use strict";



class Reg {
  constructor(options={}){
    this.project = options.project;
    this.validate();
  }

  static fromRequest(req){
    let options={};
    if(!this.pick(req, 'body.project')){
      throw new Error("Requirement : [project]");
    }
    options.project = this.pick(req, 'body.project', 'string', '');
    return new Reg(options);
  }

  validate(){
    if(!((typeof this.project === 'string') && (this.project.length>=1) && (this.project.length<=64))){
      throw new Error('type validate failed: [project]: String length must between 1 to 64');
    }

  }

  static pick(source, path, type=null, defaultValue=null){
    let paths = path.split('.');
    let tmp = source;
    for(let k in paths){
      if(tmp[paths[k]]){
        tmp = tmp[paths[k]];
      }else{
        tmp = tmp[paths[k]];
        break;
      }
    }
    if(tmp===undefined){
      return defaultValue;
    }
    switch (type){
      case 'string':
      case 'enum':
        tmp = tmp.toString();
        break;
      case 'number':
        tmp = 1*tmp;
        break;
    }
    return (defaultValue && (undefined===tmp)) ? defaultValue: tmp;
  }
}

module.exports = Reg;