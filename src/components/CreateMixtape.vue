<template>
    <div class="save-container">
        <input
            type="text"
            placeholder="Mixtape Name"
            cds-text="section"
            v-model="mixName"
            required
        />
        <cds-button @click="createMixtape">Save Mixtape </cds-button>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            mixName: '',
        }
    },
    props: ['token'],
    methods: {
        createMixtape: function () {
            if (this.mixName.length === 0) {
                return false
            } else if (!this.token) {
                return false
            } else {
                let authorization = `Bearer ${this.token}`

                axios({
                    method: 'get',
                    headers: {
                        Authorization: authorization,
                    },
                    url: `https://api.spotify.com/v1/me`,
                }).then((response) => {
                    let userId = response.data.id
                    axios({
                        method: 'post',
                        data: {
                            name: this.mixName,
                            description: 'New Mixtape',
                            public: false,
                        },

                        headers: {
                            Authorization: authorization,
                        },
                        url: `https://api.spotify.com/v1/users/${userId}/playlists`,
                    }).then((response) => {
                        let playlistId = response.data.id
                        axios({
                            method: 'POST',
                            headers: {
                                Authorization: authorization,
                            },
                            url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${this.tracks}`,
                        })
                    })
                })
            }
        },
    },

    computed: {
        tracks() {
            let sideA = this.$store.state.sides.sideA
            let sideB = this.$store.state.sides.sideB
            let sides = sideA.push(...sideB)
            let tracks = []
            sideA.forEach((s) => tracks.push(s.id))
            sideB.forEach((s) => tracks.push(s.id))
            let arr = tracks.map((track) => 'spotify%3Atrack%3A' + track)
            let tracksString = arr.join('%2C')
            return tracksString
        },
    },
}
</script>
<style scoped>
input[type='text'] {
    width: 100%;
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

.save-container {
    display: flex;
    flex-direction: column;
}
</style>
