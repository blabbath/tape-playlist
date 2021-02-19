<template>
    <cds-button @click="getCurrentTrack">Current Track</cds-button>
</template>
<script>
import axios from 'axios'
export default {
    props: ['token'],
    data() {
        return {
            auth: { authorization: `Bearer ${this.token}` },
        }
    },
    methods: {
        getCurrentTrack: function () {
            axios({
                method: 'GET',
                headers: this.auth,
                url:
                    'https://api.spotify.com/v1/me/player/currently-playing?market=US',
            }).then((response) => {
                console.log(response)
            })
        },
    },
    mounted() {
        console.log('hello')
        window.onSpotifyWebPlaybackSDKReady = () => {
            const token =
                'BQD20phv4vc-pO6E2U5eh-vwmAYt5FKk0GWgN93--ZHN8v2M-boel1yZQxZvh3CrlU25Jw8K2nE5QTMasqKp_o461M6EBs6DtikhpcQgFY5FcDd8dWuzvZ0RZrUDrSl25TmKwHQW8MPJFHBQJWWcJZ5uF2GNiU4sRG0GSseo29M'
            const player = new Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: (cb) => {
                    cb(token)
                },
            })

            // Error handling
            player.addListener('initialization_error', ({ message }) => {
                console.error(message)
            })
            player.addListener('authentication_error', ({ message }) => {
                console.error(message)
            })
            player.addListener('account_error', ({ message }) => {
                console.error(message)
            })
            player.addListener('playback_error', ({ message }) => {
                console.error(message)
            })

            // Playback status updates
            player.addListener('player_state_changed', (state) => {
                console.log(state)
            })

            // Ready
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id)
            })

            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id)
            })

            // Connect to the player!
            player.connect()
        }
    },
}
</script>
