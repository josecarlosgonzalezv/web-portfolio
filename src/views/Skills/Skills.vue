<template>
  <SectionLayout title="Skills" show-divider>
    <p class="w-100 w-md-50 mt-4 px-2">Technologies and tools I work with, grouped by area.</p>
    <v-row v-if="skillsCategories.length" class="skills-grid mt-8 w-100" no-gutters>
      <v-col v-for="(category, idx) in skillsCategories" :key="idx" cols="12" sm="6" md="4" class="pa-3">
        <v-card
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: idx * 80 } }"
          variant="elevated"
          class="skills-card pa-5 h-100"
          rounded="lg"
        >
          <div class="d-flex align-center mb-4">
            <v-icon :icon="categoryIcon(category.title)" size="28" class="mr-3" color="primary" />
            <h3 class="text-h6 font-weight-bold mb-0">
              {{ category.title }}
            </h3>
          </div>
          <div class="chips-container">
            <v-chip
              v-for="(skill, i) in category.skills"
              :key="i"
              size="large"
              variant="tonal"
              color="primary"
              class="skills-chip"
            >
              {{ skill }}
            </v-chip>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <p v-else class="text-body-2 text-medium-emphasis mt-8 px-2">No skills listed yet.</p>
  </SectionLayout>
</template>

<script setup lang="ts">
import SectionLayout from '@/components/SectionLayout/SectionLayout.vue';
import type { SkillsCategory } from '@/constants/types';
import skillsJson from '@/data/skills.json';

const skillsCategories: SkillsCategory[] = Array.isArray(skillsJson?.skillsCategories)
  ? (skillsJson.skillsCategories as SkillsCategory[])
  : [];

const categoryIcon = (title: string) => {
  const icons: Record<string, string> = {
    Frontend: 'mdi-web',
    Testing: 'mdi-test-tube',
    'DevOps & CI/CD': 'mdi-cloud-braces',
    'AI & Automation': 'mdi-robot',
    'Tools & Leadership': 'mdi-briefcase-outline',
    'Game Dev': 'mdi-gamepad-variant',
  };
  return icons[title] ?? 'mdi-tag';
};
</script>

<style scoped lang="scss" src="./Skills.scss"></style>
