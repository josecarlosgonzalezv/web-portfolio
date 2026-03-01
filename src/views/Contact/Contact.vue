<template>
  <SectionLayout title="Contact me" show-divider>
    <p class="contact-intro w-100 w-md-60 mt-6 px-4 text-body-1">
      Have a project in mind or just want to say hi? Fill in the form and I'll get back to you shortly.
    </p>
    <v-sheet class="contact-form mx-auto mt-8 pa-6 pa-md-8 w-100">
      <v-alert v-if="submitted" type="success" variant="tonal" class="mb-6" closable>
        Thank you. Your email client should open — if it doesn't, you can reach me at
        <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a
        >.
      </v-alert>
      <v-form v-else @submit.prevent>
        <v-text-field
          v-model="state.name"
          :error-messages="setErrorMessage('name')"
          label="Name"
          variant="outlined"
          density="comfortable"
          required
          @blur="v$.name.$touch"
          @input="v$.name.$touch"
        />
        <v-text-field
          v-model="state.email"
          class="mt-4"
          :error-messages="setErrorMessage('email')"
          label="Email"
          variant="outlined"
          density="comfortable"
          required
          @blur="v$.email.$touch"
          @input="v$.email.$touch"
        />
        <v-textarea
          v-model="state.message"
          class="mt-4"
          :error-messages="setErrorMessage('message')"
          label="Message"
          variant="outlined"
          density="comfortable"
          rows="5"
          required
          @blur="v$.message.$touch"
          @input="v$.message.$touch"
        />
        <v-btn
          class="mt-6 contact-submit-btn"
          color="primary"
          variant="flat"
          size="large"
          min-height="48"
          :disabled="v$.$invalid || submitting"
          :loading="submitting"
          @click="submitForm"
        >
          {{ submitting ? 'Opening email client…' : 'Submit' }}
        </v-btn>
      </v-form>
    </v-sheet>
  </SectionLayout>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { email, required, helpers } from '@vuelidate/validators';
import SectionLayout from '@/components/SectionLayout/SectionLayout.vue';
import { SITE_CONTACT_EMAIL } from '@/constants/site';

const contactEmail = SITE_CONTACT_EMAIL;
const state = reactive({
  name: '',
  email: '',
  message: '',
});
const submitted = ref(false);
const submitting = ref(false);

const rules = {
  name: { required: helpers.withMessage('Name is required', required) },
  email: {
    required: helpers.withMessage('Email is required', required),
    email: helpers.withMessage('Email must be valid', email),
  },
  message: { required: helpers.withMessage('Message is required', required) },
};

const v$ = useVuelidate(rules, state);

const setErrorMessage = (field: string) =>
  v$.value[field].$errors.map((e) => (typeof e.$message === 'string' ? e.$message : e.$message.value));

const submitForm = async () => {
  const isValid = await v$.value.$validate();

  if (isValid) {
    submitting.value = true;

    const subject = encodeURIComponent(`[Portfolio contact form]: ${state.name}`);
    const body = encodeURIComponent(`Name: ${state.name}\nEmail: ${state.email}\nMessage: ${state.message}`);
    const mailtoLink = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

    try {
      window.location.href = mailtoLink;
      submitted.value = true;
    } catch {
      submitted.value = false;
    } finally {
      submitting.value = false;
    }
  }
};
</script>

<style scoped lang="scss" src="./Contact.scss"></style>
