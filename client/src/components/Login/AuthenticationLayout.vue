<template>
  <div class="wrapper col-sm-12 col-md-6">
    <div class="row no-gutters">
      <div class="circle circle__big-top-circle"/>
      <div class="circle circle__small-top-circle"/>
      <div class="circle circle__small-body-circle"/>
      <div class="circle circle__medium-footer-circle"/>
    </div>
    <div class="branding">
      <img src="@/assets/images/logo.png" class="logo">
      <p class="wrapper__label">We are Vue</p>
    </div>
    <div class="login-form">
      <div class="col-10 offset-1 offset-sm-3">
        <p class="text-left">Please login to your account</p>
      </div>
      <div v-if="error" class="alert alert-danger col-sm-10 offset-sm-1">{{ errorMessage }}</div>
      <form @submit.prevent="validateFormData">
        <div class="form-panel col-lg-8 col-md-10 container">
          <div>
            <label class="form-panel__label text-left col-sm-10" for="email">Username</label>
            <input
              class="col-sm-10"
              id="email"
              type="email"
              name="email"
              v-model.trim="email"
              v-validate="'required|email'"
              placeholder="Phone no or email id" autocomplete="off"/>
          </div>
          <div>
            <label class="form-panel__label text-left col-sm-10" for="password">Password</label>
            <input
              class="col-sm-10"
              type="password"
              id="password"
              name="password"
              v-model="password"
              v-validate="'required|min:6'"
              placeholder="Password" />
          </div>
          <div>
            <button class="form-panel__submit col-sm-10">Login to Vue</button>
            <a href="#" class="form-panel__forgot-pwd">Forgot password?</a>
          </div>
        </div>
      </form>
    </div>
    <div class="footer row">
      <p class="footer__create-account-inline col-4 col-md-5 col-lg-4 col-xl-3">Don't have an account?</p>
      <button class="btn footer__btn-create-new col-md-5 col-sm-3 col-lg-4 col-xl-3 col-4">
        <span class="footer__btn-create-new__text-span">Create new</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthenticationLayout',

  data: () => ({
    email: '',
    password: '',
    errorMessage: '',
    error: false,
  }),

  methods: {
    validateFormData() {
      this.errorMessage = null
      this.$validator.validateAll().then(result => {
        if (result) {
          this.login()
        } else {
          this.error = true
          this.errorMessage = this.errors.first('email') || this.errors.first('password')
        }
      })
    },

    login() {
      const data = {
        email: this.email,
        password: this.password,
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~@/assets/sass/app';

.wrapper {
  &__label {
    @include margin('top', 50px);
    font-size: 2em;
  }
}

.branding {
  margin-top: 25%;
}

.login-form {
  @include margin('top', 80px);

  .alert {
  }

  &__header {
    @include horizontal-margin-auto;
    width: 50%;

    &__text {
      @include horizontal-margin-auto;
      @include padding('left', 32px);
      width: 90%;
      font-size: 17px;
    }
  }
}

.logo {
  width: 8%;
}

.form-panel {
  div {
    margin-top: 10%;
  }

  input, &__submit {
    padding: 25px 30px;
    border-radius: 45px;
    border-color: $gray-light-ec;
    border-style: solid;
  }

  &__submit:focus, input:focus {
    outline: none;
  }

  &__submit {
    @include margin('top', 10%);
    background: -webkit-linear-gradient(359deg, $yellow-light 0%, $pink-light 64%, $pink-light 100%);
    border-width: 0px;
    color: $white;
    font-size: 5mm;
  }

  &__label {
    font-weight: bold;
    color: $gray-light-b9;
    padding-left: 32px;
  }

  &__forgot-pwd {
    @include margin('top', 30px);
    display: block;
    color: $gray-light-b9;
  }
}

.footer {
  @include margin('top', 11%);
  justify-content: center;
  align-items: baseline;
  margin-bottom: 70px;

  &__create-account-inline {
    display: inline-block;
    margin: 50px 20px 0px 0px;
    padding: 0px;
  }

  &__btn-create-new {
    padding: 12px 35px;
    border-radius: 45px;
    border-style: solid;
    @media screen and (max-width: 850px) {
      padding: 0px;
    }

    /* border gradient */
    border: solid 2px transparent;
    background-image: linear-gradient(to right, $yellow-light, $pink-light), linear-gradient(to right, $yellow-light, $pink-light);
    background-origin: border-box;
    box-shadow: 2px 1000px 1px $white inset;

    &__text-span {
      background: -webkit-linear-gradient(left, $yellow-light, $pink-light);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 5mm;
    }
  }
}

.circle {
  position: absolute;

  &__medium-footer-circle {
    width: 12%;
  }

  &__small-body-circle {
    width: 7%;
  }

  &__small-top-circle {
    width: 5%;
  }

  &__big-top-circle {
    width: 25%;
  }

  @media all and (max-width: 575px) {
    display: none;
  }

  @media all and (min-width: 1500px) {
    &__big-top-circle {
      @include circle(-9%, 68%, $light-pink);
    }

    &__small-top-circle {
      @include circle(10%, 12%, $light-pink-second);
    }

    &__small-body-circle {
      @include circle(45%, 85%, $light-pink-third);
    }

    &__medium-footer-circle {
      @include circle(82%, 7%, $light-pink-third);
    }
  }

  @media all and (max-width: 1500px) {
    &__big-top-circle {
      @include circle(-7%, 68%, $light-pink);
    }

    &__small-top-circle {
      @include circle(9%, 13%, $light-pink-second);
    }

    &__small-body-circle {
      @include circle(44%, 85%, $light-pink-third);
    }

    &__medium-footer-circle {
      @include circle(82%, 7%, $light-pink-third);
    }
  }

  @media all and (max-width: 1300px) {
    &__big-top-circle {
      @include circle(-6.5%, 68%, $light-pink);
    }

    &__small-body-circle {
      @include circle(43%, 85%, $light-pink-third);
    }
  }

  @media all and (max-width: 1150px) {
    &__small-top-circle {
      @include circle(8%, 14%, $light-pink-second);
    }

    &__small-body-circle {
      @include circle(42%, 85%, $light-pink-third);
    }
  }

  @media all and (max-width: 1000px) {
    &__big-top-circle {
      @include circle(-6%, 68%, $light-pink);
    }

    &__small-top-circle {
      @include circle(7%, 15%, $light-pink-second);
    }

    &__small-body-circle {
      @include circle(41%, 85%, $light-pink-third);
    }
  }

  @media all and (max-width: 991) {
    &__small-body-circle {
      @include circle(44%, 90%, $light-pink-third);
    }
  }

  @media screen and (max-width: 850px) {
    &__big-top-circle {
      @include circle(-5%, 68%, $light-pink);
    }

    &__small-top-circle {
      @include circle(6%, 16%, $light-pink-second);
    }
  }

  @media screen and (max-width: 725px) {
    &__big-top-circle {
      @include circle(-4.5%, 68%, $light-pink);
    }

    &__small-top-circle {
      @include circle(5.5%, 16%, $light-pink-second);
    }
  }

  @media screen and (max-width: 697px) {
    &__small-body-circle {
      @include circle(40%, 85%, $light-pink-third);
    }
  }
}

.circle:before {
  content: "";
  display: block;
  padding-top: 100%;
}
</style>