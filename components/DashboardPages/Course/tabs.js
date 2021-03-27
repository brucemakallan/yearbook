const tabs = (universityId, departmentId) => [
  {
    id: 'list',
    label: 'LIST',
    link: `/dashboard/universities/${universityId}/departments/${departmentId}/courses`,
  },
  {
    id: 'new',
    label: 'NEW',
    link: `/dashboard/universities/${universityId}/departments/${departmentId}/courses/new`,
  },
];

export default tabs;
