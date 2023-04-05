import pageList from '@/routes/pagelist';

function setPageTitle(path) {
  const sysTitle = import.meta.env.VITE_APP_PAGE_TITLE || '';
  const page = pageList.find((item) => item.path === path);
  if (sysTitle && page && page.title) {
    document.title = `${sysTitle} - ${page.title}`;
  } else if (page && page.title) {
    document.title = page.title;
  } else {
    document.title = sysTitle;
  }
}

export default setPageTitle;
