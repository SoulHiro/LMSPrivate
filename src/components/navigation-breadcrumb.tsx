"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import type {
  BreadcrumbItem as BreadcrumbItemType,
  NavigationBreadcrumbProps,
} from "@/types";

export function NavigationBreadcrumb({
  items,
  className,
}: NavigationBreadcrumbProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            <BreadcrumbItem>
              {item.isCurrentPage || !item.href ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
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
}): BreadcrumbItemType[] {
  const items: BreadcrumbItemType[] = [];

  // Área
  if (video.course?.area) {
    items.push({
      label: video.course.area.name,
      href: `/area/${video.course.area.pathSlug}`,
    });
  }

  // Curso
  if (video.course) {
    items.push({
      label: video.course.name,
      href: `/course/${video.course.pathSlug}`,
    });
  }

  // Módulo
  if (video.module) {
    items.push({
      label: video.module.name,
      href: `/module/${video.module.pathSlug}`,
    });
  }

  // Vídeo atual
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
}): BreadcrumbItemType[] {
  const items: BreadcrumbItemType[] = [];

  // Área
  if (course.area) {
    items.push({
      label: course.area.name,
      href: `/area/${course.area.pathSlug}`,
    });
  }

  // Curso atual
  items.push({
    label: course.name,
    isCurrentPage: true,
  });

  return items;
}

export function createAreaBreadcrumbs(area: {
  name: string;
  pathSlug: string;
}): BreadcrumbItemType[] {
  return [
    {
      label: "Áreas de Conhecimento",
      href: "/streaming",
    },
    {
      label: area.name,
      isCurrentPage: true,
    },
  ];
}

export function createSimpleBreadcrumbs(label: string): BreadcrumbItemType[] {
  return [
    {
      label,
      isCurrentPage: true,
    },
  ];
}
