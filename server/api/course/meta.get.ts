import type { Course, Chapter, CourseMeta, OutlineChapter, OutlineLesson } from "~/types/course";
import course from '~/server/courseData';

const typedCourse: Course = course;

export default defineEventHandler((): CourseMeta => {
  const outline: OutlineChapter[] = typedCourse.chapters.reduce(
    (prev: OutlineChapter[], next: Chapter) => {
      const lessons: OutlineLesson[] = next.lessons.map(
        (lesson) => ({
          title: lesson.title,
          slug: lesson.slug,
          number: lesson.number,
          path: `/course/chapter/${next.slug}/lesson/${lesson.slug}`,
        })
      );

      const chapter: OutlineChapter = {
        title: next.title,
        slug: next.slug,
        number: next.number,
        lessons,
      };

      return [...prev, chapter];
    },
    []
  );

  return {
    title: typedCourse.title,
    chapters: outline,
  };
});