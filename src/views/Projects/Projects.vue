<template>
  <SectionLayout title="PROJECTS" show-divider alt-bg>
    <p class="w-100 w-md-50 mt-4 px-2">
      A selection of personal and professional work — from web development projects to game prototypes built during my
      master's degree.
    </p>
    <v-row v-if="projectsData.length" class="mt-6 w-100 projects-row" no-gutters>
      <v-col
        v-for="(project, idx) in projectsData"
        :key="project.title"
        align-self="center"
        cols="12"
        sm="6"
        md="6"
        lg="4"
        class="pa-4 pa-sm-6"
      >
        <div
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: idx * 100 } }"
        >
          <ProjectCard
            :title="project.title"
            :subtitle="project.subtitle"
            :description="project.description"
            :link="project.link"
            :img="project.img"
          />
        </div>
      </v-col>
    </v-row>
    <p v-else class="text-body-2 text-medium-emphasis mt-6 px-2">No projects listed yet.</p>
  </SectionLayout>
</template>

<script setup lang="ts">
import SectionLayout from '@/components/SectionLayout/SectionLayout.vue';
import ProjectCard from '@/components/ProjectCard/ProjectCard.vue';
import type { Project } from '@/constants/types';
import projectsJson from '@/data/projects.json';

const projectsData: Project[] = Array.isArray(projectsJson)
  ? (projectsJson as Project[]).map((p) => (p.img ? { ...p, img: `${import.meta.env.BASE_URL}${p.img}` } : p))
  : [];
</script>

<style scoped lang="scss" src="./Projects.scss"></style>
