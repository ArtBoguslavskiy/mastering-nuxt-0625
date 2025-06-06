<script setup>
const course = useCourse();
const route = useRoute();

const chapter = computed(() => {
  return course.chapters.find(chapter => chapter.slug === route.params.chapterSlug);
})

const lesson = computed(() => {
  return chapter.value.lessons.find(lesson => lesson.slug === route.params.lessonSlug);
})

console.log('Course:', course);
</script>

<template>
  <div class="prose">
    <h2>Lesson</h2>
    <p>This is a lesson</p>
    <p>Chapter slug: {{ chapter.title }}</p>
    <p>Lesson slug: {{ lesson.title }}</p>
  </div>
</template>