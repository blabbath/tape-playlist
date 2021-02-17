<template>
    <div layout wide>
        <div class="search-container">
            <input
                type="search"
                v-model="searchInput"
                @keyup="searchSpotifyAPI"
                placeholder="Search for a track"
                cds-text="section"
            />

            <div class="search-output" v-if="searchInput">
                <div
                    v-for="result of searchResult"
                    :key="result"
                    class="search-result"
                    cds-text="message"
                >
                    <div class="plus-icon" @click="addTrackToStore(result)">
                        <cds-icon
                            shape="plus-circle"
                            status="success"
                            size="22"
                        ></cds-icon>
                    </div>
                    {{ result.artist }} - {{ result.track }} ({{
                        result.duration_mmss
                    }})
                </div>
            </div>
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
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    props: ['token'],
    data() {
        return {
            searchInput: '',
            searchResult: [],
            mixName: '',
        }
    },
    methods: {
        searchSpotifyAPI: function () {
            if (this.token && this.searchInput) {
                axios
                    .get(
                        `https://api.spotify.com/v1/search?q=${this.searchInput}&type=track&limit=3&access_token=${this.token}`
                    )
                    .then((response) => {
                        this.returnAPIresults(response)
                    })
            } else if (this.searchInput.length === 0) {
                this.searchResult.length = 0
            }
        },

        msToMinuteSecond: function (ms) {
            let seconds = ms / 1000
            seconds = seconds % 3600
            let minutes = parseInt(seconds / 60)
            seconds = Math.round(seconds % 60)
            return minutes + ':' + this.padSeconds(seconds)
        },

        padSeconds: function (num) {
            num = num.toString()
            while (num.length === 1) num = '0' + num
            return num
        },

        returnAPIresults: function (response) {
            this.searchResult.length = 0
            response.data.tracks.items.forEach((item) => {
                let obj = {}
                obj.track = item.name
                obj.album = item.album.name
                obj.artist = item.artists[0].name
                obj.duration_ms = item.duration_ms
                obj.duration_mmss = this.msToMinuteSecond(item.duration_ms)
                obj.id = item.id
                this.searchResult.push(obj)
            })
        },

        addTrackToStore: function (result) {
            this.$store.commit('addTrack', result)
        },

        createMixtape: function () {
            if (this.mixName.length === 0) {
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
<style>
.search-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 16%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

@media only screen and (min-width: 992px) {
    .search-container {
        top: 12%;
        width: 20rem;
    }
}

@media only screen and (min-width: 768px) {
    .search-container {
        width: 24rem;
        margin: 0 auto;
    }
}

input[type='search'],
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
    outline-color: #fe763e;
}

input[type='search']::-webkit-search-cancel-button {
    display: none;
}

.search-output {
    display: flex;
    z-index: 100;
    flex-direction: column;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.85);
    width: 100%;
    margin: 1rem;
    border-radius: 3px;
    border: 1px solid #666666;
    padding: 1rem;
}

.search-result {
    max-width: 100%;
    padding: 0.5rem 0;
    display: inline-flex;
    align-items: flex-start;
    line-height: 1.5rem;
}

.plus-icon cds-icon {
    margin: 0 0.5rem;
    cursor: pointer;
}

.save-container form {
    display: flex;
    flex-direction: column;
}
</style>
