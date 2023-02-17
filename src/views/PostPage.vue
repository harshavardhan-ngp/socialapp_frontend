<template>
    <b-container>
        <div class="center">
            <h2>Feed</h2>
            <div v-if="feeds.length > 0">
                <b-row>
                    <b-card v-for="item in feeds" :key="item.id" class="col-lg-4 col-sm-6" title="Title" img-src=""
                        img-alt="Image" img-top>
                        <b-card-text>
                            {{ item.caption }}
                        </b-card-text>
                        <template #footer>
                            <b-button type="submit" variant="warning" class="mx-2">Update</b-button>
                            <b-button type="submit" variant="danger" class="mx-2" @click="del(item.id)">Delete</b-button>
                        </template>
                    </b-card>
                </b-row>
            </div>
            <div v-else>
                No Data found
            </div>
        </div>
    </b-container>
</template>

<script>
import { api } from '../../axios';

export default {
    name: "PostPage",
    data() {
        return {
            feeds: [],
            refresh: false
        }
    },
    methods: {
        makeToast(variant, msg) {
            this.$bvToast.toast(msg, {
                autoHideDelay: 3000,
                variant: variant,
                // solid: true,
                toaster: 'b-toaster-top-center',
                noCloseButton: true
            })
        },

        del(id) {
            api.delete('app/' + id)
                .then(res => {
                    this.refresh=!this.refresh
                    this.makeToast('success', res.data.message)
                })
        }
    },
    watch: {
        refresh() {
            api.get('app').then(res => {
                console.log(res.data);
                this.feeds = res.data.data
            })
                .catch(err => {
                    console.log(err);
                })
        }
    },
    mounted() {
        api.get('app').then(res => {
            console.log(res.data);
            this.feeds = res.data.data
        })
            .catch(err => {
                console.log(err);
            })
    }

}
</script>

<style>
.center {
    width: 100%;
    margin: auto;
}

.toast:not(.show) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    font-size: 15px;
}
</style>