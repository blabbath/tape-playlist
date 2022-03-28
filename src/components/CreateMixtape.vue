<template>
    <div class="save-container">
        <input
            type="text"
            placeholder="Mixtape Name"
            cds-text="section"
            v-model="mixName"
            required
        />
        <cds-button @click="createMixtape">Save Mixtape</cds-button>
        <create-alert
            :alertMessage="alertMessage"
            :alertStatus="alertStatus"
            :alertCount="alertCount"
        ></create-alert>
    </div>
</template>
<script>
import axios from 'axios'
import CreateAlert from './CreateAlert.vue'

export default {
    components: { CreateAlert },
    data() {
        return {
            mixName: '',
            auth: { authorization: `Bearer ${this.token}` },
            userId: null,
            playlistItems: [],
            offset: 0,
            alertMessage: '',
            alertStatus: '',
            alertCount: 0,
            playlists: null,
        }
    },
    props: ['token'],
    methods: {
        createMixtape () {
            this.checkRequirements()
                ? false
                : this.getUserPlaylists(true).then(() => {
                      this.checkUniqueName()
                          ? false
                          : axios({
                                method: 'POST',
                                data: {
                                    name: this.mixName,
                                    description: 'New Mixtape',
                                    public: false,
                                },
                                headers: this.auth,
                                url: `https://api.spotify.com/v1/users/${this.userId}/playlists`,
                            }).then((response) => {
                                let playlistId = response.data.id
                                axios({
                                    method: 'POST',
                                    headers: this.auth,
                                    url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${this.tracks}`,
                                }).then(() => {
                                    this.sendAlert(
                                        'Your Mixtape was successfully saved!',
                                        'success'
                                    )
                                })
                            })
                  })
        },

        checkRequirements () {
            if (this.mixName.length === 0) {
                this.sendAlert(
                    'Please provide a name for your Mixtape',
                    'danger'
                )
                return true
            } else if (this.tracks.length === 0) {
                this.sendAlert(
                    'There are no tracks to save on your tape!',
                    'danger'
                )
                return true
            }
        },

        getUserPlaylists (init) {
            if (init) {
                init = false
            } else {
                this.offset = this.offset + 10
            }

            return axios({
                method: 'GET',
                headers: this.auth,
                url: `https://api.spotify.com/v1/me/playlists?limit=10&offset=${this.offset}`,
            }).then((res) => {
                if (res.data.items.length !== 0) {
                    res.data.items.forEach((item) =>
                        this.playlistItems.push(item)
                    )
                    this.getUserPlaylists(init)
                } else {
                    /* Reset variables for the next call of the function */
                    this.offset = 0
                    this.playlistItems.length = 0
                    return
                }
            })
        },

        checkUniqueName () {
            this.playlists = [
                ...new Set(this.playlistItems.map((item) => item.name)),
            ]
            if (this.playlists.includes(this.mixName)) {
                this.sendAlert(
                    'This name is already taken by another playlist of yours.',
                    'danger'
                )
                return true
            } else {
                return false
            }
        },

        sendAlert(message, status) {
            this.alertMessage = message
            this.alertStatus = status
            this.alertCount++
        },
    },

    mounted() {
        axios({
            method: 'get',
            headers: this.auth,
            url: `https://api.spotify.com/v1/me`,
        }).then((response) => {
            this.userId = response.data.id
        })
    },

    computed: {
        tracks() {
            let sideA = this.$store.state.tape.sides.sideA
            let sideB = this.$store.state.tape.sides.sideB
            let tracks = []
            sideA.forEach((s) => tracks.push(s.id))
            sideB.forEach((s) => tracks.push(s.id))
            let tracksString = tracks
                .map((track) => 'spotify%3Atrack%3A' + track)
                .join('%2C')
            return tracksString
        },
    },
}
</script>
<style scoped>
.save-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

input[type='text'] {
    width: 15rem;
    height: 3rem;
    padding: 0.6rem;
    border: 1px solid #666666;
    border-radius: 3px;
    background-color: white;
    margin: 0.5rem 0;
}

input:focus {
    background-color: white;
    outline-color: black;
}

input[type='search']::-webkit-search-cancel-button {
    display: none;
}

cds-button {
    margin-top: 3rem;
}
</style>
