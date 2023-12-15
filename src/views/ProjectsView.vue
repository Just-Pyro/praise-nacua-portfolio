<script setup>
import MainLayout from '../components/MainLayout.vue';

// Page Title of Views
const pageTitle = 'Projects'
</script>

<template>
    <MainLayout :pageTitle="pageTitle">
        <section>
        My Portfolio Projects 
        </section>
        <div class="mb-8"></div>

        <div class="px-6 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:gap-8">
        <router-link to="/todolist" href="#" class="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80">
            <img src="../assets/todo.png"
                loading="lazy" alt="debtstore"
                class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

            <div
                class="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
            </div>

            <span class="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">TO DO APP</span>
        </router-link>

            <router-link to="/vuegames/flappybird" class="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80">
                <img src="../assets/flappy-bird-square.png"
                    loading="lazy" alt="vuegames"
                    class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                <div
                    class="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                </div>

                <span class="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">FLAPPY BIRD</span>
            </router-link>
        </div>
            
    </MainLayout>
</template>