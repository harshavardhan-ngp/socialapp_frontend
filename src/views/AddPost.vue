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
        fileChange(e) {
            // console.log(e.target.files);
            this.image = e.target.files[0]
        },
        handleSubmit(e) {
            e.preventDefault()
            const data={
                image:this.image,
                caption:this.caption
            }
            const formdata = new FormData()
            console.log(typeof data.image);
            formdata.append('image', this.image)
            // formdata.append('caption', this.caption)
            api.post('app', data)
            .then(res=>{
                console.log(res.data.data);
            })
            .catch(err=>{
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