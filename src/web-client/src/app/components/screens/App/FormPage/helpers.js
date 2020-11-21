import { format } from 'date-fns';

export const modifyApiResponse = (data) => {
  if (!data) {
    return undefined;
  }

  return {
    ...data,
    projects: data.projects?.map((project) => ({
      ...project,
      period: {
        startDate: new Date(project.period.startDate),
        endDate: new Date(project.period?.endDate),
      },
      technologies: project.technologies.join(', '),
    })),
    education: data.education?.map((item) => ({
      ...item,
      qualifications: item.qualifications.join(', '),
      period: {
        startDate: new Date(item.period.startDate),
        endDate: new Date(item.period?.endDate),
      },
    })),
    profileImage: '',
  };
};

export const modifyApiRequest = (data) => {
  if (!data) {
    return undefined;
  }

  return {
    ...data,
    projects: data.projects?.map((project) => ({
      ...project,
      period: {
        startDate: format(project.period.startDate, 'yyyy-MM-dd'),
        endDate: format(project.period?.endDate, 'yyyy-MM-dd'),
      },
      technologies: project.technologies.replace(/\s{2,}/g, ' ').split(/\s*,\s*/),
    })),
    education: data.education?.map((item) => ({
      ...item,
      qualifications: item.qualifications.replace(/\s{2,}/g, ' ').split(/\s*,\s*/),
      period: {
        startDate: format(item.period.startDate, 'yyyy-MM-dd'),
        endDate: format(item.period?.endDate, 'yyyy-MM-dd'),
      },
    })),
  };
};
