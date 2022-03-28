const state = { token: localStorage.getItem('token') || null }

const mutations = {
    getToken(state) {
        const hash = window.location.hash
            .substring(1)
            .split('&')
            .reduce((initial, item) => {
                if (item) {
                    let parts = item.split('=')
                    initial[parts[0]] = decodeURIComponent(parts[1])
                }
                return initial
            }, {})
        window.location.hash = ''
        state.token = hash.access_token
        localStorage.setItem('token', state.token)
    },
}

const module = { state, mutations }

export default module
