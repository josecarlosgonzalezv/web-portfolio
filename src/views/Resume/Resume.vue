<template>
  <SectionLayout title="RESUME" show-divider alt-bg section-class="resume-layout">
    <p class="resume-intro mt-4 px-2">Download my CV in the format that suits you best.</p>
    <div class="resume-cards mt-10">
      <v-card class="resume-card pa-6" variant="elevated" rounded="lg">
        <div class="resume-card__header d-flex align-center mb-4">
          <v-icon icon="mdi-file-document-outline" size="36" color="primary" class="mr-3" />
          <div>
            <h3 class="text-h6 font-weight-bold mb-0">Compact CV</h3>
            <p class="text-body-2 text-medium-emphasis mb-0">One-page summary</p>
          </div>
        </div>
        <p class="resume-card__description text-body-2 mb-6">
          A concise, one-page overview of my experience, skills, and education — ideal for a quick read.
        </p>
        <v-btn
          color="primary"
          variant="tonal"
          size="large"
          prepend-icon="mdi-download"
          :href="cvCompactUrl"
          download="JoseCarlos_CV_Compact.pdf"
          target="_blank"
        >
          Download
        </v-btn>
      </v-card>

      <v-card class="resume-card pa-6" variant="elevated" rounded="lg">
        <div class="resume-card__header d-flex align-center mb-4">
          <v-icon icon="mdi-file-document-multiple-outline" size="36" color="primary" class="mr-3" />
          <div>
            <h3 class="text-h6 font-weight-bold mb-0">Full CV</h3>
            <p class="text-body-2 text-medium-emphasis mb-0">Detailed version</p>
          </div>
        </div>
        <p class="resume-card__description text-body-2 mb-6">
          A detailed breakdown of my professional background, projects, and academic achievements.
        </p>
        <v-btn
          color="primary"
          variant="tonal"
          size="large"
          prepend-icon="mdi-download"
          :href="cvFullUrl"
          download="JoseCarlos_CV_Full.pdf"
          target="_blank"
        >
          Download
        </v-btn>
      </v-card>
    </div>
    <p class="resume-footer text-body-2 text-medium-emphasis mt-6 px-2">
      If a download link doesn't work, please
      <a :href="`mailto:${contactEmail}`">contact me</a>
      and I'll send the CV directly.
    </p>
  </SectionLayout>
</template>

<script setup lang="ts">
import SectionLayout from '@/components/SectionLayout/SectionLayout.vue';
import { SITE_CONTACT_EMAIL } from '@/constants/site';

const contactEmail = SITE_CONTACT_EMAIL;
const base = import.meta.env.BASE_URL;
const cvCompactUrl = `${base}cv-compact.pdf`;
const cvFullUrl = `${base}cv-full.pdf`;
</script>

<style scoped lang="scss" src="./Resume.scss"></style>
