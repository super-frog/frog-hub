const Project = require('../definitions/models/FrogHubProject.gen');
const Reg = {
  //项目标识符 string:1,64 in:body require
  project:'',
 };

module.exports = (Reg) => {
  let model = Project.create(Reg);
  return model.save(true);
};