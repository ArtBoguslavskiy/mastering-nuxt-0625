<script setup>
const course = await useCourse();
const firstLesson = await useFirstLesson()

const resetError = async (clearError) => {
  await navigateTo(firstLesson.path);
  clearError();
};
</script>

<template>
    <div>
      <div class="mb-4 flex justify-between items-center w-full">
        <h1 class="text-3xl">
          <span class="font-medium">
            <span class="font-bold">{{ course.title }}</span>
          </span>
        </h1>
        <UserCard />
      </div>

      <div class="flex flex-row justify-center flex-grow">
        <div
          class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] max-w-[30ch] flex flex-col"
        >
          <h3>Chapters</h3>
          <div
            v-for="chapter in course.chapters" :key="chapter.slug" class="space-y-1 mb-4 flex flex-col"
          >
            <h4>{{ chapter.title }}</h4>
            <NuxtLink
              v-for="(lesson, index) in chapter.lessons"
              :key="lesson.slug"
              class="flex flex-row space-x-1 no-underline prose-sm font-normal py-1 px-4 -mx-4 text-gray-600"
              exact-active-class="!text-blue-500"
              :to="lesson.path"
            >
              <span class="text-gray-500"
                >{{ index + 1 }}.</span
              >
              <span>{{ lesson.title }}</span>
            </NuxtLink>
          </div>
        </div>

        <div class="prose p-12 bg-white rounded-md w-[65ch]">
          <NuxtErrorBoundary>
            <NuxtPage />
            <template #error="{ error, clearError }">
              <p>
                Oh no, something went wrong with the lesson!
                <code>{{ error }}</code>
              </p>
              <div>
                <button
                  class="hover:cursor-pointer bg-gray-500 text-white font-bold py-1 px-3 rounded"
                  @click="resetError(clearError)"
                >
                  Reset
                </button>
              </div>
            </template>
          </NuxtErrorBoundary>
        </div>
      </div>
    </div>
</template>