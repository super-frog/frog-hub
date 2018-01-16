//加载项目信息
const Project = require('../definitions/models/FrogHubProject.gen');
const Getter = {
    //项目标识符 string:1,20 in:params require
    project:"",
};
module.exports = async (Getter) => {
    let model = await Project.fetchByName(Getter.project);
    model.prefix = 123;
    return model;
    
};