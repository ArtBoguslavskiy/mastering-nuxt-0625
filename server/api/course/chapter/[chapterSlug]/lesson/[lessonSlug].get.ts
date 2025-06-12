import course from '~/server/courseData';

export default defineEventHandler(event => {
  const { chapterSlug, lessonSlug } = event.context.params as {chapterSlug: string, lessonSlug: string};

  const chapter = course.chapters.find((chapter) => chapter.slug === chapterSlug);

  if(!chapter) {
    throw createError({
      statusCode: 404,
      statusMessage: `Chapter "${chapterSlug}" not found`
    });
  }

  const lesson = chapter?.lessons.find((lesson) => lesson.slug === lessonSlug);

  if(!lesson) {
    throw createError({
      statusCode: 404,
      statusMessage: `Lesson "${lessonSlug}" not found in Chapter "${chapterSlug}"`
    });
  }

  return lesson;
})
