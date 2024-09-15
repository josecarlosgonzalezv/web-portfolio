<template>
  <v-parallax class="align-center">
    <div class="d-flex flex-column w-100 text-center align-center ma-auto pt-12">
      <h3 class="text-h3 font-weight-black">Contact me</h3>
      <CustomDivider class="mt-4" />
      <p class="w-50 mt-4">
        Feel free to contact me by submitting the form below and I will get back to you as soon as possible.
      </p>
      <v-sheet class="mx-auto mt-4 w-75 w-md-50">
        <v-form @submit.prevent>
          <v-text-field
            v-model="state.name"
            :error-messages="setErrorMessage('name')"
            label="Name"
            required
            @blur="v$.name.$touch"
            @input="v$.name.$touch"
          ></v-text-field>
          <v-text-field
            v-model="state.email"
            class="mt-4"
            :error-messages="setErrorMessage('email')"
            label="Email"
            required
            @blur="v$.email.$touch"
            @input="v$.email.$touch"
          ></v-text-field>
          <v-textarea
            class="mt-4"
            v-model="state.message"
            :error-messages="setErrorMessage('message')"
            label="Message"
            required
            @blur="v$.message.$touch"
            @input="v$.message.$touch"
          ></v-textarea>
          <v-btn class="w-100 mt-4" @click="submitForm" :disabled="v$.$invalid">Submit</v-btn>
        </v-form>
      </v-sheet>
    </div>
  </v-parallax>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { email, required, helpers } from '@vuelidate/validators';
import { Store } from '@/store';
import { initStore } from '@/store/utils';
import CustomDivider from '@/components/CustomDivider/CustomDivider.vue';

const store = ref<Store>({} as Store);

const state = reactive({
  name: '',
  email: '',
  message: '',
});

const rules = {
  name: { required: helpers.withMessage('Name is required', required) },
  email: {
    required: helpers.withMessage('Email is required', required),
    email: helpers.withMessage('Email must be valid', email),
  },
  message: { required: helpers.withMessage('Message is required', required) },
};

const v$ = useVuelidate(rules, state);

onBeforeMount(() => initStore(store));

const setErrorMessage = (field: string) =>
  v$.value[field].$errors.map((e) => (typeof e.$message === 'string' ? e.$message : e.$message.value));

const submitForm = () => {
  v$.value.$validate();

  if (!v$.value.$invalid) {
    const subject = encodeURIComponent(`[Portfolio contact form]: ${state.name}`);
    const body = encodeURIComponent(`Name: ${state.name}\nEmail: ${state.email}\nMessage: ${state.message}`);
    const mailtoLink = `mailto:sbgonzalezjosecarlos@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
  }
};
</script>
