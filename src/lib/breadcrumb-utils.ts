// Utilitários para breadcrumbs que podem ser usados em Server Components
import type { BreadcrumbItem } from "@/types";

export function createSimpleBreadcrumbs(label: string): BreadcrumbItem[] {
  return [
    {
      label,
      isCurrentPage: true,
    },
  ];
}

export function createVideoBreadcrumbs(video: {
  name: string;
  course?: {
    name: string;
    pathSlug: string;
    area?: {
      name: string;
      pathSlug: string;
    };
  } | null;
  module?: {
    name: string;
    pathSlug: string;
  } | null;
}): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    {
      label: "Streaming",
      href: "/streaming",
    },
  ];

  if (video.course?.area) {
    items.push({
      label: video.course.area.name,
      href: `/area/${video.course.area.pathSlug}`,
    });
  }

  if (video.course) {
    items.push({
      label: video.course.name,
      href: `/course/${video.course.pathSlug}`,
    });
  }

  if (video.module) {
    items.push({
      label: video.module.name,
      href: `/module/${video.module.pathSlug}`,
    });
  }

  items.push({
    label: video.name,
    isCurrentPage: true,
  });

  return items;
}

export function createCourseBreadcrumbs(course: {
  name: string;
  pathSlug: string;
  area?: {
    name: string;
    pathSlug: string;
  };
}): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    {
      label: "Streaming",
      href: "/streaming",
    },
  ];

  if (course.area) {
    items.push({
      label: course.area.name,
      href: `/area/${course.area.pathSlug}`,
    });
  }

  items.push({
    label: course.name,
    isCurrentPage: true,
  });

  return items;
}

export function createAreaBreadcrumbs(area: {
  name: string;
  pathSlug: string;
}): BreadcrumbItem[] {
  return [
    {
      label: "Streaming",
      href: "/streaming",
    },
    {
      label: area.name,
      isCurrentPage: true,
    },
  ];
}