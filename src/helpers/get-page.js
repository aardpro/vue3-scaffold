import pageList from '@/routes/pagelist';

export function getPageByLocation(path) {
  return pageList.find((item) => item.path === path);
}

export function getPageByTitle(title) {
  return pageList.find((item) => item.title === title);
}
