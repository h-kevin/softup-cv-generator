import { format } from 'date-fns';

export const modifyApiResponse = (data) => {
  if (!data) {
    return undefined;
  }

  return {
    ...data,
    spokenLanguages: data?.spokenLanguages.map((language) => {
      delete language._id;
      return language;
    }),
    projects: data.projects?.map((project) => {
      delete project._id;

      return {
        ...project,
        period: {
          startDate: new Date(project.period.startDate),
          endDate: project.period?.endDate
            ? new Date(project.period?.endDate)
            : null,
        },
        technologies: project?.technologies
          ? project?.technologies?.join(', ')
          : '',
      };
    }),
    education: data.education?.map((item) => {
      delete item._id;
      
      return {
        ...item,
        qualifications: item?.qualifications
          ? item?.qualifications?.join(', ')
          : '',
        period: {
          startDate: new Date(item.period.startDate),
          endDate: item.period?.endDate
            ? new Date(item.period?.endDate)
            : null,
        },
      };
    }),
    profileImage: '',
  };
};

export const modifyApiRequest = (data) => {
  if (!data) {
    return undefined;
  }

  delete data.profileImage;

  return {
    ...data,
    projects: data.projects?.map((project) => ({
      ...project,
      period: {
        startDate: format(project.period.startDate, 'yyyy-MM-dd'),
        endDate: project.period?.endDate 
          ? format(project.period?.endDate, 'yyyy-MM-dd')
          : null,
      },
      technologies: project?.technologies
        ? project?.technologies?.replace(/\s{2,}/g, ' ')?.split(/\s*,\s*/)
        : [],
    })),
    education: data.education?.map((item) => ({
      ...item,
      qualifications: item?.qualifications
        ? item?.qualifications?.replace(/\s{2,}/g, ' ')?.split(/\s*,\s*/)
        : [],
      period: {
        startDate: format(item.period.startDate, 'yyyy-MM-dd'),
        endDate: item.period?.endDate
          ? format(item.period?.endDate, 'yyyy-MM-dd')
          : null,
      },
    })),
  };
};
