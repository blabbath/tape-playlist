<template>
    <div class="save-container">
        <input
            type="text"
            placeholder="Mixtape Name"
            cds-text="section"
            v-model="mixName"
            required
        />
        <!--         <app-alert
            :alertMessage="alertSuccess"
            :alertStatus="alertStatus"
        ></app-alert> -->
        <!--         <app-alert
            :alertMessage="alertDanger"
            :alertStatus="alertStatus"
        ></app-alert> -->
        <cds-button @click="createMixtape">Save Mixtape </cds-button>
    </div>
</template>
<script>
import axios from 'axios'
import AppAlert from './Alert.vue'

export default {
    components: { AppAlert },
    data() {
        return {
            mixName: '',
            auth: { authorization: `Bearer ${this.token}` },
            userId: null,
            playlistItems: [],
            offset: 0,
            alertStatus: null,
        }
    },
    props: ['token'],
    methods: {
        createMixtape: function () {
            if (this.mixName.length === 0 || this.tracks.length === 0) {
                return false
            } else {
                this.getUserPlaylists(true).then(() => {
                    if (this.checkUniqueName()) {
                        return
                    } else {
                        axios({
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
                                this.alertSuccess
                                this.alertStatus = 'success'
                            })
                        })
                    }
                })
            }
        },

        getUserPlaylists: function (init) {
            init ? (init = false) : (this.offset = this.offset + 10)

            return axios({
                method: 'GET',
                headers: this.auth,
                url: `https://api.spotify.com/v1/me/playlists?limit=10&offset=${this.offset}`,
            }).then((playlists) => {
                if (playlists.data.items.length !== 0) {
                    playlists.data.items.forEach((item) =>
                        this.playlistItems.push(item)
                    )
                    this.getUserPlaylists(init)
                } else {
                    this.checkUniqueName
                    return false
                }
            })
        },

        checkUniqueName: function () {
            this.alertMessage = null
            let arrayNames = [
                ...new Set(this.playlistItems.map((item) => item.name)),
            ]
            if (arrayNames.includes(this.mixName)) {
                this.alertStatus = 'danger'
                this.alertMessage = `You already own a playlists named "${this.mixName}", please provide a unique name.`
                return true
            } else {
                return false
            }
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
            let sideA = this.$store.state.sides.sideA
            let sideB = this.$store.state.sides.sideB
            let tracks = []
            sideA.forEach((s) => tracks.push(s.id))
            sideB.forEach((s) => tracks.push(s.id))
            let arr = tracks.map((track) => 'spotify%3Atrack%3A' + track)
            let tracksString = arr.join('%2C')
            return tracksString
        },

        /*         alertSuccess() {
            return this.$store.commit('alertPlaylistCreate')
        }, */
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
    width: 20rem;
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
</style>
