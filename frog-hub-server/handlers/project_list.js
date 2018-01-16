//加载项目信息
const Project = require('../definitions/models/FrogHubProject.gen');

module.exports = async () => {
    let list = await Project.fetchByAttr({
        status:1
    });
    
    return list;
    
};