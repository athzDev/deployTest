import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Breadcrumbs } from 'src/components/udb/commonStyle';
import Intl from "src/components/common/Intl";



const labels = {
  home: "BreadCrumb@Homepage",
  member: "SIDEBAR@MYDASHBOARD"
}

export const getUrl = (pathName: string, param: object) => {
  const paramsKey = Object.keys(param);
  let path = pathName;
  if (paramsKey.length) {
    path = paramsKey.reduce((curr, prev) => {
      let _id = param[prev]
      if (curr.includes(_id)) {
        return curr.replace(_id, '')
      }
      return curr;
    }, pathName);
  }
  return path;
}

export default function Breadcrumb() {
  const { pathname } = useLocation();
  const params = useParams();
  const [pathArr, setpathArr] = useState([]);

  useEffect(() => {
    let path = getUrl(pathname, params);
    let links = path.split("/").filter((elm) => elm);
    setpathArr(links);
  }, [pathname]);

  return (
    <Breadcrumbs>
      <Link to={'/'}>{<Intl langKey={labels['home']} />}</Link>&nbsp;&gt;&nbsp;
      {
        pathArr.map((elm, i) => {
          if ((pathArr.length - 1) === i) { return <span key={i}>{<Intl langKey={labels[elm]} />}</span> }
          else {
            let prevArr = pathArr.slice(0, i).join('/');
            return <React.Fragment key={i}><Link to={`/${prevArr ? prevArr + '/' : ''}${elm}`}>{<Intl langKey={labels[elm]} />}</Link>&nbsp;&gt;&nbsp;</React.Fragment>
          }
        })
      }
    </Breadcrumbs>
  );
}