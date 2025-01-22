import { useLocation } from "react-router-dom";

export const getPathName = () => {
  let { pathname } = useLocation();

  let pathSegments = pathname.split("/").filter(Boolean);
  let pathArray = pathSegments.map((path) => {
    switch (path) {
      case "listcompany":
        return "List Company";
      case "page1":
        return "Page 1";
      case "page2":
        return "Page 2";
      case "companydetails":
        return "Company Details";
      case "uts":
        return "Ujian Tengah Semester";
      default:
        return path;
    }
  });

  pathArray.unshift("");
  return pathArray.length > 0 ? pathArray : ["No Path"];
};

export const getPath = (pathIndex) => {
  let { pathname } = useLocation();
  let pathArray = pathname.split("/").filter(Boolean);
  let path = "/" + pathArray.slice(0, pathIndex + 1).join("/");
  return path;
};
