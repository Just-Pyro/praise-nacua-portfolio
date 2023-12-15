<template>
    <div class="bg-white py-6 sm:py-8">
        <div class="px-6 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 lg:gap-8 mb-8 md:mb-12">
            <div class="flex flex-col gap-2">
                <h2 class="text-2xl font-bold text-lime-800 lg:text-3xl">My Portfolio Projects</h2>

                <p class="text-lime-500 text-lg">
                    These are my Projects.
                </p>
            </div>
        </div>
        
        <!-- Project Image Gallery -->
        <div class="px-6 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:gap-8">
            <!-- image - start -->
            <router-link to="/projects" href="#" class="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-80">
                <img src="../assets/todo.png"
                    loading="lazy" alt="debtstore"
                    class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                <div
                    class="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                </div>

                <span class="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">TO DO</span>
            </router-link>
            <!-- image - end -->

            <!-- image - start -->
            <router-link to="/projects"
                class="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:col-span-2 md:h-80">
                <img src="../assets/flappy-bird.png"
                    loading="lazy" alt="chatapp"
                    class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />

                <div
                    class="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50">
                </div>

                <span class="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">FLAPPY BIRD</span>
            </router-link>
            <!-- image - end -->
        </div>
    </div>
</template>