const ProblemType = require("../../models/problem-type");

var problemTypes;
const store = {};

const addRepairPerson = ({ _id, canSolve }, socketId) => {
    for (let problemType of canSolve) {
        store.problemTypeToRepairperson[problemType].push({ _id, socketId })
    }
}

const removeRepairPerson = ({ _id, canSolve }) => {
    for (let problemType of canSolve) {
        let map = store.problemTypeToRepairperson[problemType];
        store.problemTypeToRepairperson[problemType] = map.filter(elem => elem._id != _id);
    }
}

const initStore = async () => {
    problemTypes = await ProblemType.find({});
    store.problemTypeToRepairperson = {};
    for (let i = 0; i < problemTypes.length; i++)
        store.problemTypeToRepairperson[i + 1] = [];
    store.addRepairPerson = addRepairPerson;
    store.removeRepairPerson = removeRepairPerson;
    return;
}

module.exports = {
    initStore,
    store
} 