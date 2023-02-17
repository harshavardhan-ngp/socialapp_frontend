<template>
    <div id="app">

        <div class="login-page">

            <div class="wallpaper-register"></div>

            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
                        <div v-if="!registerActive" class="card">
                            <h1 class="header">Sign In</h1>
                            <form class="form-group">
                                <input v-model="login.email" type="email" class="form-control"
                                    :class="isSubmitted && (!$v.login.email.required || !$v.login.email.email) ? 'errBorder' : ''"
                                    placeholder="Email" required />
                                <div v-if="isSubmitted && !$v.login.email.required" class="errorLogin">Email is
                                    required</div>

                                <input v-model="login.password" type="password" class="form-control"
                                    placeholder="Password" required />
                                <div v-if="isSubmitted && !$v.login.email.required" class="errorLogin">Password is
                                    required</div>

                                <input type="submit" class="btn btn-primary" @click="handleLogin" />
                                <p class="mt-4">Don't have an account? <span
                                        @click="registerActive = !registerActive, isSubmitted = false">Sign up here</span>
                                </p>
                            </form>
                        </div>

                        <div v-else class="card">
                            <h1 class="header">Sign Up</h1>
                            <form class="form-group">
                                <input v-model="reg.email" type="email"
                                    :class="isSubmitted && (!$v.reg.email.required || !$v.reg.email.email) ? 'errBorder' : ''"
                                    class="form-control" placeholder="Email" required />
                                <div v-if="isSubmitted && !$v.reg.email.required" class="errorLogin">Email is
                                    required</div>

                                <input v-model="reg.password" type="password"
                                    :class="isSubmitted && (!$v.reg.password.required || !$v.reg.password.minLength) ? 'errBorder' : ''"
                                    class="form-control" placeholder="Password" required />
                                <div v-if="isSubmitted && !$v.reg.password.required" class="errorLogin">Password is
                                    required</div>
                                <div v-if="isSubmitted && !$v.reg.password.minLength" class="errorLogin">Password
                                    must contain 8 letters</div>
                                <div v-if="isSubmitted && !$v.reg.password.valid" class="errorLogin">Password must
                                    contain atleast
                                    <ul>
                                        <li>a Uppercase</li>
                                        <li>a Lowercase</li>
                                        <li>a Number</li>
                                        <li>a Special Character</li>
                                    </ul>
                                </div>

                                <input v-model="reg.confirmPass" type="password"
                                    :class="isSubmitted && (!$v.reg.confirmPass.required || !$v.reg.confirmPass.sameAsPassword) ? 'errBorder' : ''"
                                    class="form-control" placeholder="Confirm Password" required />
                                <div v-if="isSubmitted && !$v.reg.confirmPass.required" class="errorLogin">Confirm
                                    Password is required</div>
                                <div v-if="isSubmitted && !$v.reg.confirmPass.sameAsPassword" class="errorLogin">
                                    Mismatched Pasword</div>

                                <input type="submit" class="btn btn-primary" @click="register" />
                                <p class="mt-4">Already have an account? <span
                                        @click="registerActive = !registerActive, isSubmitted = false">Sign in here</span>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import { api } from "../../axios";
import {
    required,
    email,
    minLength, sameAs
} from "vuelidate/lib/validators";
export default {
    name: 'LoginPage',
    data() {
        return {
            login: {
                email: "",
                password: "",
            },
            reg: {
                email: "",
                password: "",
                confirmPass: "",
            },
            registerActive: false,
            isSubmitted: false,

        }
    },
    validations: {
        login: {
            email: {
                required,
                email,
            },
            password: {
                required,

            },
        },

        reg: {
            email: {
                required,
                email,
            },
            password: {
                required,
                minLength: minLength(8),
                valid: function (value) {
                    const containsUppercase = /[A-Z]/.test(value)
                    const containsLowercase = /[a-z]/.test(value)
                    const containsNumber = /[0-9]/.test(value)
                    const containsSpecial = /[#?!@$%^&*-]/.test(value)
                    return containsUppercase && containsLowercase && containsNumber && containsSpecial
                }
            },
            confirmPass: { required, sameAsPassword: sameAs('password') }
        },
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

        async handleLogin(e) {
            e.preventDefault()
            this.isSubmitted = true
            if (this.$v.login.$invalid) {
                console.log(this.$v);
                return
            }
            console.log('login:', this.login);
            this.isSubmitted = false
            const logged = await api.post('login', this.login)

            console.log("logged:", logged);
            if (logged.data.success) {
                localStorage.setItem('auth', logged.data.accessToken)
                this.$router.push('/post')

            }
            else if (!logged.data.success) {
                this.makeToast('danger', logged.data.message)

            }
        },

        async register(e) {
            e.preventDefault()
            this.isSubmitted = true
            if (this.$v.reg.$invalid) {
                console.log(this.$v);
                return false
            }

            this.isSubmitted = false
            const registered = await api.post('register', this.reg)
            console.log("registered:", registered);
            if (registered.data.success) {
                localStorage.setItem('auth', registered.data.accessToken)
                this.$router.push('/post')
            }
            else if (!registered.data.success) {
                this.makeToast('danger', registered.data.message)

            }
                

        }
    }

}
</script>

<style scoped>
span {
    cursor: pointer;
    text-decoration: underline;
    color: blue;
}

.errBorder {
    border: 1px solid orangered !important;
}

.errBorder:focus {
    box-shadow: 0 0 0 0.25rem rgb(255 83 73 / 25%) !important;
}

p {
    line-height: 1rem;
}

.card {
    padding: 20px;
}

.form-group input {
    margin-top: 17px;
}

.login-page {
    align-items: center;
    display: flex;
    height: 100vh;
}

.wallpaper-register {
    background: url('~@/assets/background.jpg') no-repeat center center;
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: -1;
}

.errorLogin {
    animation-name: errorShake;
    animation-duration: 0.3s;
    font-size: 500;
    color: orangered;
}

@keyframes errorShake {
    0% {
        transform: translateX(-55px);
    }

    25% {
        transform: translateX(15px);
    }

    50% {
        transform: translateX(-15px);
    }

    75% {
        transform: translateX(15px);
    }

    100% {
        transform: translateX(0);
    }
}
</style>