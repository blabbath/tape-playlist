import { setAttributes } from '@cds/core/internal'
import { createStore } from 'vuex'

let sumDuration = function (arr) {
    let result = arr.reduce((a, b) => a + b['duration_ms'], 0)
    return result
}

let unsetAlert = function (obj) {
    Object.keys(obj).forEach((k) => (obj[k] = null))
}

let sideMS = 2700000

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
            unsetAlert(state.alerts)
            let durationCurrentTrack = n.duration_ms
            let totalLengthA =
                sumDuration(state.sides.sideA) + durationCurrentTrack
            let totalLengthB =
                sumDuration(state.sides.sideB) + durationCurrentTrack
            state.alerts.alertSideA = null
            state.alerts.alertSideB = null
            if (totalLengthA <= sideMS) {
                state.sides.sideA.push(n)
            } else if (totalLengthB <= sideMS) {
                state.alerts.alertSideA =
                    'Side A of your mixtape cannot hold a track of that length.'
                state.sides.sideB.push(n)
            } else {
                state.alerts.alertSideB =
                    'Side B of your mixtape cannot hold a track of that length.'
            }
        },
        removeTrack(state, obj) {
            unsetAlert(state.alerts)
            state.sides[obj.side].splice(obj.index, 1)
        },

        moveTrackUp(state, obj) {
            unsetAlert(state.alerts)
            if (obj.side === 'sideB' && obj.index === 0) {
                let element = state.sides.sideB[0]
                let totalLengthA = sumDuration(state.sides.sideA)
                let durationCurrentTrack = element.duration_ms
                if (totalLengthA + durationCurrentTrack <= sideMS) {
                    state.sides.sideA.push(element)
                    state.sides.sideB.shift()
                } else {
                    state.alerts.alertSideA =
                        'Side A of your mixtape cannot hold a track of that length.'
                }
            } else {
                let element = state.sides[obj.side][obj.index]
                state.sides[obj.side].splice(obj.index, 1)
                state.sides[obj.side].splice(obj.index - 1, 0, element)
            }
        },

        moveTrackDown(state, obj) {
            unsetAlert(state.alerts)
            if (
                obj.side === 'sideA' &&
                obj.index + 1 === state.sides.sideA.length
            ) {
                let element = state.sides.sideA[state.sides.sideA.length - 1]
                let totalLengthB = sumDuration(state.sides.sideB)
                let durationCurrentTrack = element.duration_ms
                if (totalLengthB + durationCurrentTrack <= sideMS) {
                    state.sides.sideB.unshift(element)
                    state.sides.sideA.pop()
                } else {
                    state.alerts.alertSideB =
                        'Side B of your mixtape cannot hold a track of that length.'
                }
            } else {
                let element = state.sides[obj.side][obj.index]
                state.sides[obj.side].splice(obj.index, 1)
                state.sides[obj.side].splice(obj.index + 1, 0, element)
            }
        },
        closeAlert(state) {
            unsetAlert(state.alerts)
        },
    },
})
