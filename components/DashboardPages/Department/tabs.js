const tabs = (universityId) => [
  {
    id: 'list',
    label: 'LIST',
    link: `/dashboard/universities/${universityId}/departments`,
  },
  {
    id: 'new',
    label: 'NEW',
    link: `/dashboard/universities/${universityId}/departments/new`,
  },
];

export default tabs;
