<template>
    <b-container>
        <b-navbar variant="dark" style="margin-bottom: 20px !important;">
            <b-collapse class="padding" id="" is-nav>
                <b-container>
                    <b-nav tabs justified>
                        <b-nav-item to="/post" exact exact-active-class="navtab active ">Post</b-nav-item>
                        <b-nav-item to="/add" exact exact-active-class="navtab active ">Add</b-nav-item>
                        <b-nav-item  exact exact-active-class="navtab active" @click="logout">Logout</b-nav-item>
                    </b-nav>
                </b-container>

                <!-- Right aligned nav items -->

            </b-collapse>
        </b-navbar>
        <slot />
    </b-container>

</template>

<script>
export default {
    name: 'DefaultLayout',
    methods:{
        logout(){
            localStorage.removeItem('auth')
            this.$router.push('/')
        }
    }
}
</script>

<style>
.nav-item a {
    width: 85% !important;
    border-color: white;
    /* // border: 0; */
    border-radius: 0;
    color: red;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: color 150ms ease-in-out;
}

.nav-item a:after {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 100%;
    background: white;
    z-index: -1;
    transition: width 150ms ease-in-out;
}

.nav-item a:hover {
    color: black;
}

.nav-item a:hover::after {
    width: 110%;
}
</style>