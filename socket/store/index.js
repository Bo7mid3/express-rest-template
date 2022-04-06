const ProblemType = require("../../models/problem-type");

var problemTypes;
const store = {};

const addRepairPerson = (user , socketId) => {
    const { canSolve, _id } = user;
    for (let problemType of canSolve) {
        
        //remove old sockets
        let map = store.problemTypeToRepairperson[problemType];
        store.problemTypeToRepairperson[problemType] = map.filter(elem => elem.user._id != _id);

        store.problemTypeToRepairperson[problemType].push({ user, socketId })
    }
}

const removeRepairPerson = (user, socketId) => {
    const { canSolve } = user;
    for (let problemType of canSolve) {
        let map = store.problemTypeToRepairperson[problemType];
        store.problemTypeToRepairperson[problemType] = map.filter(elem => elem.socketId != socketId);
    }
}

const getRepairPersonsByProblemType = (problemTypeId) => {
    return store.problemTypeToRepairperson[problemTypeId];    
}

const initStore = async () => {
    problemTypes = await ProblemType.find({});
    store.problemTypeToRepairperson = {};
    for (let i = 0; i < problemTypes.length; i++)
        store.problemTypeToRepairperson[i + 1] = [];
    store.addRepairPerson = addRepairPerson;
    store.removeRepairPerson = removeRepairPerson;
    store.getRepairPersonsByProblemType = getRepairPersonsByProblemType;
    return;
}

module.exports = {
    initStore,
    store
} 