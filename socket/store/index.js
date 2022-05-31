const ProblemType = require("../../models/problem-type");

var problemTypes;
const store = {};

const addRepairPerson = (user , socketId) => {
    const { canSolve, _id } = user;
    for (let problemType of canSolve) {
        
        //remove old sockets
        /*let map = store.problemTypeToRepairperson[problemType];
        store.problemTypeToRepairperson[problemType] = map.filter(elem => elem.user._id != _id);*/

        store.problemTypeToRepairperson[problemType].push({ user, socketId })
    }
}

const getReceiverSocketsIds = ({_id}) => {
    return store.users.filter(elem => elem.user._id == _id);
}

const addUser = ({user, id}) => {
    store.users.push({user, id});
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
    store.users = [];
    problemTypes = await ProblemType.find({});
    store.problemTypeToRepairperson = {};
    for (let i = 0; i < problemTypes.length; i++)
        store.problemTypeToRepairperson[i + 1] = [];
    store.addRepairPerson = addRepairPerson;
    store.removeRepairPerson = removeRepairPerson;
    store.getRepairPersonsByProblemType = getRepairPersonsByProblemType;
    store.getReceiverSocketsIds = getReceiverSocketsIds;
    store.addUser = addUser;
    return;
}

module.exports = {
    initStore,
    store
} 