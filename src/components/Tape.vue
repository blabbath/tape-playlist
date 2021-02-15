<template>
    <div class="tape-container" layout wide>
        <div
            cds-layout="grid cols@sm:12 cols@xl:6 align:horizontal-center"
            class="sides"
        >
            <div cds-layout="p-y:lg" cds-text="section" class="side-container">
                <app-side
                    :alert="alertSideA"
                    :tracks="tracksA"
                    title="Side A"
                    sideIdentifier="sideA"
                ></app-side>
            </div>
            <div cds-layout="p-y:lg" cds-text="section" class="side-container">
                <app-side
                    :alert="alertSideB"
                    :tracks="tracksB"
                    title="Side B"
                    sideIdentifier="sideB"
                ></app-side>
            </div>
        </div>
    </div>
</template>
<script>
import AppSide from './Side.vue'
export default {
    components: { AppSide },
    computed: {
        tracksA() {
            return this.$store.state.sides.sideA
        },

        alertSideA() {
            return this.$store.state.alerts.alertSideA
        },
        tracksB() {
            return this.$store.state.sides.sideB
        },

        alertSideB() {
            return this.$store.state.alerts.alertSideB
        },
    },
}
</script>
<style>
.tape-container {
    position: absolute;
    width: 100%;
    top: 65%;
    margin: 1rem 0 0 0;
    padding: 2rem 0;
    background-color: rgba(255, 255, 255, 0.85);
}

.side {
    position: relative;
    margin: 0;
    padding: 0 2rem 0.5rem;
    border-bottom: 1px solid #666666;
}

table {
    border-collapse: collapse;
}

tr td {
    border-bottom: 1px dotted #666666;
}

td {
    border-spacing: 0;
    padding: 0.5rem 0.5rem;
}

cds-alert-group {
    margin-left: 0.75rem;
    width: 60%;
}

.icon {
    display: flex;
    flex-direction: column;
    cursor: pointer;
}

.move-icon {
    --color: #666666;
}

.side-container {
    width: 95%;
}
</style>
