import { CourseCard, mockCourses } from "@/entities/course";

export function CourseGrid() {
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{mockCourses.map((course) => (
				<CourseCard key={course.id} course={course} />
			))}
		</div>
	);
}
