<template>
    <b-container>
        <!-- <b-button v-b-modal.modal-1>Launch demo modal</b-button> -->
        <b-modal id="modal-1" title="Update Post" @hidden="resetModal" @ok="handleOk">
            <b-form class="col-lg-9 form">
                <b-form-group class="inputField mb-4">
                    <b-form-file v-model="image" class="mt-3" plain @change="fileChange"></b-form-file>
                </b-form-group>
                <b-form-textarea id="textarea" v-model="caption" placeholder="Enter caption" rows="3" max-rows="6"
                    class="mb-4"></b-form-textarea>
                <!-- <b-button type="submit" variant="primary">Submit</b-button> -->

                <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
            </b-form>
        </b-modal>
        <div class="center">
            <h2>Feed</h2>
            <div v-if="feeds.length > 0">
                <b-row>
                    <b-card v-for="item in feeds" :key="item.id" class="col-lg-4 col-sm-6" title="Title">
                        <b-card-img :src=item.image alt="Image" class="rounded-0"></b-card-img>
                        <b-card-text>
                            {{ item.caption }}
                        </b-card-text>
                        <template #footer>
                            <b-button type="submit" variant="warning" class="mx-2" v-b-modal.modal-1
                                @click="update(item)">Update</b-button>
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
            refresh: false,
            image: null,
            caption: '',
            updateID: 0
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
        fileChange(e) {
            // console.log(e.target.files);
            this.image = e.target.files[0]
        },
        del(id) {
            api.delete('app/' + id)
                .then(res => {
                    this.refresh = !this.refresh
                    this.makeToast('success', res.data.message)
                })
        },
        update(item) {
            this.updateID = item.id
            this.image = item.image
            this.caption = item.caption

        },
        resetModal() {
            this.image = null,
                this.updateID = 0,
                this.caption = ''
        },
        handleOk() {
            // console.log();
            api.put('app/' + this.updateID, { caption: this.caption })
                .then(res => {
                    console.log(res.data);
                    this.makeToast('success', res.data.message)
                    this.refresh = !this.refresh
                    this.resetModal()
                })
        },

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