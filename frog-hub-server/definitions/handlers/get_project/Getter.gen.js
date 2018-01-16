"use strict";



class Getter {
  constructor(options={}){
    this.project = options.project;
    this.validate();
  }

  static fromRequest(req){
    let options={};
    if(!this.pick(req, 'params.project')){
      throw new Error("Requirement : [project]");
    }
    options.project = this.pick(req, 'params.project', 'string', '');
    return new Getter(options);
  }

  validate(){
    if(!((typeof this.project === 'string') && (this.project.length>=1) && (this.project.length<=20))){
      throw new Error('type validate failed: [project]: String length must between 1 to 20');
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
        if(typeof tmp === 'object'){
          tmp = JSON.stringify(tmp);
        }else{
          tmp = tmp.toString();
        }
        break;
      case 'number':
        tmp = 1*tmp;
        break;
    }
    return (defaultValue && (undefined===tmp)) ? defaultValue: tmp;
  }
}

module.exports = Getter;