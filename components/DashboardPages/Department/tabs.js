const tabs = (universityId) => [
  {
    id: 'list',
    label: 'LIST',
    link: `/dashboard/institutions/${universityId}/departments`,
  },
  {
    id: 'new',
    label: 'NEW',
    link: `/dashboard/institutions/${universityId}/departments/new`,
  },
];

export default tabs;
