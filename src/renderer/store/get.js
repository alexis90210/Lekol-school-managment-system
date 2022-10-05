export const state = () => {
    etablissement:{}
    user:{}
}

export const mutations = {
    storeEtab(state, etablissement) {
        state.etablissement = etablissement
    },

    storeEUser(state, user) {
        state.user = user
    },
}

export const actions = {}

export const getters = {}