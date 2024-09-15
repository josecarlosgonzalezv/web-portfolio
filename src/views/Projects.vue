<template>
  <v-parallax class="align-center">
    <div class="d-flex flex-column w-100 text-center align-center ma-auto pt-12">
      <h3 class="text-h3 font-weight-black">PROJECTS</h3>
      <CustomDivider class="mt-4" />
      <p class="w-50 mt-4">
        Here you will find some of the personal and client projects I have created with each project containing its own
        case study, you will also see projects I have worked on during my master's degree and during my professional
        career as a web developer.
      </p>
      <v-row class="mt-4 w-100 w-md-75 flex-column flex-md-row" no-gutters>
        <v-col v-for="(project, idx) in projects" :key="idx" align-self="center" cols="9" sm="9" md="6" class="pa-6">
          <ProjectCard
            :title="project.title"
            :subtitle="project.subtitle"
            :description="project.description"
            :link="project.link"
            :img="project.img"
          />
        </v-col>
      </v-row>
    </div>
  </v-parallax>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { Store } from '@/store';
import { initStore } from '@/store/utils';
import CustomDivider from '@/components/CustomDivider/CustomDivider.vue';
import ProjectCard from '@/components/ProjectCard/ProjectCard.vue';
import { Project } from '@/constants/types';
import chiImage from '@/assets/chi.png';

const store = ref<Store>({} as Store);
const projects = ref<Project[]>([
  {
    title: 'Rosa Runner Adventure',
    subtitle: 'Infinity loop 2D game',
    description:
      "Game made during the master's degree in videogame development and design at EVAD. The game was made in 2D using unity as graphic engine and C# as programming language.",
    link: 'https://www.youtube.com/embed/9mx98O4Z0Kg?si=1MObGV-F24w0vAl0',
  },
  {
    title: 'Tank Zombie Survivor',
    subtitle: '3D Wave round game',
    description:
      "Game made during the master's degree in videogame development and design at EVAD. The game was made in 3D using unity as graphic engine and C# as programming language.",
    link: 'https://www.youtube.com/embed/aiUev93ZPSw?si=iK96kHnhFrE2L6sq',
  },
  {
    title: 'Global Game Jam 2023',
    subtitle: 'Game made for a Game Jam at EVAD',
    description:
      'Game made for an EVAD Game Jam with the theme: roots. The game was made in 2D using unity as graphic engine and C# as programming language.',
    link: 'https://www.youtube.com/embed/Pyl5GnafSHY?si=iEOvK6qdBdIY_xDS',
  },
  {
    title: 'Realms Untold',
    subtitle: '3D Turn-based RPG game',
    description:
      "Game made as a final project for EVAD's master's degree in development and design. The game was made in 3D using unity as graphic engine and C# as programming language.",
    link: 'https://www.youtube.com/embed/qYsi35bjkiQ?si=sMRm6BSf1TG4TM3J',
  },
  {
    title: 'Chi Design System',
    subtitle: 'https://lib.lumen.com/chi/latest',
    description:
      'Design system for building digital products and experiences. This library supports Stencil-based web components and Vue components.',
    img: chiImage,
  },
]);

onBeforeMount(() => initStore(store));
</script>
