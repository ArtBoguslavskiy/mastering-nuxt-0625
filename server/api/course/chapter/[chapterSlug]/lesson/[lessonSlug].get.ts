import type { Course, Chapter, Lesson, LessonWithPath } from '~/types/course';
import course from '~/server/courseData';

const typedCourse: Course = course;

export default defineEventHandler((event): LessonWithPath => {
  const { chapterSlug, lessonSlug } = event.context.params as { chapterSlug: string, lessonSlug: string} ;

  const chapter: Maybe<Chapter> = typedCourse.chapters.find((chapter) => chapter.slug === chapterSlug);

  if(!chapter) {
    throw createError({
      statusCode: 404,
      statusMessage: `Chapter "${chapterSlug}" not found`
    });
  }

  const lesson: Maybe<Lesson> = chapter?.lessons.find((lesson) => lesson.slug === lessonSlug);

  if(!lesson) {
    throw createError({
      statusCode: 404,
      statusMessage: `Lesson "${lessonSlug}" not found in Chapter "${chapterSlug}"`
    });
  }

  return {
    ...lesson,
    path: `/course/chapter/${chapterSlug}/lesson/${lessonSlug}`,
  };
})
