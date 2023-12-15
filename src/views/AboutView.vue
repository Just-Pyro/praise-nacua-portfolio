<script setup>
import MainLayout from '../components/MainLayout.vue';

// Page Title of Views
const pageTitle = 'About'
</script>

<template>
  <MainLayout :pageTitle="pageTitle">
    <section class="bg-lime-950 text-white py-8">
      <div class="container mx-auto text-center">
        <p class="text-lg mb-4">
          Let's get to know me a bit more.
        </p>
      </div>
    </section>

    <div class="max-w-full w-full bg-white p-8 rounded-lg shadow-md mx-auto mt-8">
      <h2 class="text-3xl font-bold text-lime-800 mb-6">About Me</h2>

        <div class="mb-4">
          <p class="text-justify font-semibold text-lime-800 mb-2">
            I'm Praise Emmanuel M. Nacua with an age of 22, a BSIT student at Cordova National Highschool. I live in Poblacion, Cordova Cebu. My hobbies include playing lots of video games (most especially retro ones) and watching some animes, kpop, vlogs, game development, listening and playing music, and actually a lot more. <br><br>
            I became an IT Student not because it's my only option but because I dreamed of becoming one of the developers of those huge video game companies specifically "Nintendo". <br><br>
            But being an IT Student made me realize that there's a lot more that I need to learn and need to accomplish if I want to pursue the dream of being a part of Gaming Industries.
          </p>
        </div>
    </div>
  </MainLayout>
</template>
