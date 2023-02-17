<template>
    <b-container>
        <h2>Add Post</h2>
        <b-form @submit="handleSubmit" class="col-lg-9 form">
            <b-form-group class="inputField mb-4">
                <b-form-file v-model="image" class="mt-3" plain @change="fileChange"></b-form-file>
            </b-form-group>
            <b-form-textarea id="textarea" v-model="caption" placeholder="Enter caption" rows="3" max-rows="6"
                class="mb-4"></b-form-textarea>
            <b-button type="submit" variant="primary">Submit</b-button>

            <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
        </b-form>
    </b-container>
</template>

<script>
import { api } from '../../axios';

export default {
    data() {
        return {
            // file: null,
            image: [],
            caption: ''
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
        handleSubmit(e) {
            e.preventDefault()
            // const data = {
            //     image: this.image,
            //     caption: this.caption
            // }
            const formdata = new FormData()
            formdata.append('image', this.image)
            formdata.append('caption', this.caption)
            api.post('app', formdata    , { headers: { "Content-type": "multipart/formdata" } })
                .then(res => {
                    console.log(res.data);
                    this.makeToast('success', res.data.message)
                })
                .catch(err => {
                    console.log("formdata:", formdata);
                    console.log(err);
                })
        }
    }
}
</script>

<style>
.form {
    width: 50%;
    margin: auto;
}
</style>