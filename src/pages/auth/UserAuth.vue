<template>
  <div>
    <BaseDialog
      :show="!!error"
      title="An error occured"
      @close="closeErrorDialog"
    >
      <p>{{ error }}</p>
    </BaseDialog>
    <BaseDialog :show="isLoading" fixed title="Authenticating">
      <BaseSpinner></BaseSpinner>
    </BaseDialog>
    <BaseCard>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password (must be at least 6 characters
          long).
        </p>
        <BaseButton>{{ submitButtonCaption }}</BaseButton>
        <BaseButton type="button" mode="flat" @click.native="switchAuthMode">{{
          switchModeButtonCaption
        }}</BaseButton>
      </form>
    </BaseCard>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") return "Login";
      else return "Signup";
    },
    switchModeButtonCaption() {
      if (this.mode === "login") return "Signup instead";
      else return "Login instead";
    },
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;
      if (this.mode === "login") {
        this.$store
          .dispatch("login", {
            email: this.email,
            password: this.password,
          })
          .then(
            () => {
              this.isLoading = false;
              const redirectUrl =
                "/" + (this.$route.query.redirect || "coaches");
              this.$router.replace(redirectUrl);
            },
            (error) => {
              this.error = error.message;
              this.isLoading = false;
            }
          );
      } else {
        this.$store
          .dispatch("signup", {
            email: this.email,
            password: this.password,
          })
          .then(
            () => {
              this.isLoading = false;
            },
            (error) => {
              this.error = error.message;
              this.isLoading = false;
            }
          );
      }
    },
    switchAuthMode() {
      if (this.mode === "login") this.mode = "signup";
      else this.mode = "login";
    },
    closeErrorDialog() {
      this.error = null;
    },
  },
};
</script>

<style lang="less" scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
  &:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
  }
}
</style>
