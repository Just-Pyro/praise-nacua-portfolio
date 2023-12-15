<script setup>
import MainLayout from '../components/MainLayout.vue';
import HeroBanner from '../components/HeroBanner.vue';
import ProjectGallery from '../components/ProjectGallery.vue';

// Page Title of Views
const pageTitle = 'Home'
</script>

<template>
  <MainLayout :pageTitle="pageTitle">
    
    <!-- Hero Banner Section -->
    <HeroBanner />

    <!-- Project Gallery -->
    <ProjectGallery />

  </MainLayout>
</template>