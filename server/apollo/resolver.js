const axios = require('axios');

module.exports = {
    Query: {
        getEventByOwnerID: async (parent, args) => {
            let { data } = await axios.get(`http://localhost:3004/event`);
            console.log(data);
            return data.filter((e) => e.eventOwnerId === args.ownerID);
        },
        oneInvolver: async (parent, args) => {
            let {
                data: { allInvolvers },
            } = await axios.get(`http://localhost:3004/event/event1`);
            return allInvolvers.find((e) => args.id === e.id);
        },
        allInvolvers: async (parent, args) => {
            let { data } = await axios.get(
                'http://localhost:3004/event/event1'
            );
            return data.allInvolvers;
        },
        allBills: async (parent, args) => {
            let { data } = await axios.get(
                'http://localhost:3004/event/event1'
            );
            return data.allBills;
        },
    },

    Bill: {
        participants: (parent) => {
            return parent.participantsId.map(async (involverId) => {
                let {
                    data: { allInvolvers },
                } = await axios.get(`http://localhost:3004/event/event1`);
                return allInvolvers.find((each) => {
                    return each.id === involverId;
                });
            });
        },
    },
};
