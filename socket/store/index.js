const ProblemType = require("../../models/problem-type");

const store = {};

const initStore = async () => {
    const problemTypes = await ProblemType.find({});
    store.problemTypeToUser = {};
    for (let i = 1; i <= problemTypes.length; i++)
        store.problemTypeToUser[i] = [];
    return;
}

module.exports = {
    initStore,
    store
} 