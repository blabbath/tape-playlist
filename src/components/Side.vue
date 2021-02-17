<template>
    <div>
        <p class="side">{{ title }}</p>
        <cds-alert-group
            status="warning"
            aria-label="This is an example warning alert group"
            v-if="alert"
        >
            <cds-alert
                cds-i18n='{ "closeButtonAriaLabel": "close warning alert"}'
                :closable="true"
                @click="closeAlert()"
            >
                {{ alert }}
            </cds-alert>
        </cds-alert-group>
        <table>
            <tr
                v-for="(track, index) in tracks"
                :key="track"
                cds-text="message"
            >
                <td>
                    <div
                        class="icon"
                        @click="removeTrack(index, sideIdentifier)"
                    >
                        <cds-icon
                            shape="minus-circle"
                            status="danger"
                            size="22"
                        ></cds-icon>
                    </div>
                </td>
                <td>
                    {{ index + 1 }}
                </td>
                <td>{{ track.artist }} - {{ track.track }}</td>
                <td>
                    {{ track.duration_mmss }}
                </td>
                <td>
                    <div class="icon">
                        <cds-icon
                            class="move-icon"
                            shape="angle"
                            size="22"
                            @click="moveTrackUp(index, sideIdentifier)"
                        ></cds-icon>
                        <cds-icon
                            class="move-icon"
                            shape="angle"
                            size="22"
                            flip="vertical"
                            @click="moveTrackDown(index, sideIdentifier)"
                        ></cds-icon>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    props: ['alert', 'title', 'tracks', 'sideIdentifier'],
    methods: {
        removeTrack: function (index, side) {
            let obj = {
                index,
                side,
            }
            this.$store.commit('removeTrack', obj)
        },

        moveTrackUp: function (index, side) {
            let obj = {
                index,
                side,
            }
            this.$store.commit('moveTrackUp', obj)
        },
        moveTrackDown: function (index, side) {
            let obj = {
                index,
                side,
            }
            this.$store.commit('moveTrackDown', obj)
        },
        closeAlert: function () {
            this.$store.commit('closeAlert')
        },
    },
}
</script>
<style></style>
