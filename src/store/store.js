import { createStore } from 'vuex'

let sumDuration = function (arr) {
    let result = arr.reduce((a, b) => a + b['duration_ms'], 0)
    return result
}

export const store = createStore({
    state: {
        sides: { sideA: [], sideB: [] },
        alerts: {
            alertSideA: null,
            alertSideB: null,
        },
    },
    mutations: {
        addTrack(state, n) {
            let durationCurrentTrack = n.duration_ms
            let totalLengthA =
                sumDuration(state.sides.sideA) + durationCurrentTrack
            let totalLengthB =
                sumDuration(state.sides.sideB) + durationCurrentTrack
            state.alerts.alertSideA = null
            state.alerts.alertSideB = null
            if (totalLengthA <= 2700000) {
                state.sides.sideA.push(n)
            } else if (totalLengthB <= 2700000) {
                state.alerts.alertSideA =
                    'Side A of your mixtape cannot hold a track of that length.'
                state.sides.sideB.push(n)
            } else {
                state.alerts.alertSideB =
                    'Side B of your mixtape cannot hold a track of that length.'
            }
        },
        removeTrack(state, obj) {
            state.alerts.alertSideA = null
            state.alerts.alertSideB = null
            state.sides[obj.side].splice(obj.index, 1)
        },
    },
})
