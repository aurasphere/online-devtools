import Footer from "./footer";
import Header from "./header";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { BsLink45Deg, BsLockFill } from "react-icons/bs";
import { SiJsonwebtokens } from "react-icons/si";
import { Link, useLocation } from "react-router-dom";
import { path as hashPath, pageName as hashPageName } from "../pages/hash-page";
import { path as hmacPath, pageName as hmacPageName } from "../pages/hmac-page";
import {
  path as cipherPath,
  pageName as cipherPageName,
} from "../pages/cipher-page";
import { path as jwePath, pageName as jwePageName } from "../pages/jwe-page";
import { path as urlPath, pageName as urlPageName } from "../pages/url-page";
import {
  path as base64Path,
  pageName as base64PageName,
} from "../pages/base64-page";

export default function PageLayout(props) {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => setCollapsed(!collapsed);
  const location = useLocation();
  const isCipherActive = () => location.pathname === cipherPath;
  const isUrlActive = () => location.pathname === urlPath;
  const isJweActive = () => jwePath.includes(location.pathname);
  const isBase64Active = () => location.pathname === base64Path;
  const isHmacActive = () => location.pathname === hmacPath;
  const isHashActive = () => location.pathname === hashPath;

  const textIcon = (text) => <strong className="m-0 arial">{text}</strong>;

  return (
    <div className="layout">
      <aside>
        <ProSidebar collapsed={collapsed}>
          <Menu iconShape="square" popperArrow={true}>
            <MenuItem icon={<MdMenu />} onClick={toggleCollapsed} />
            <MenuItem icon={<SiJsonwebtokens />} active={isJweActive()}>
              {jwePageName} <Link to={jwePath[1]} />
            </MenuItem>
            <MenuItem icon={textIcon("C")} active={isCipherActive()}>
              {cipherPageName} <Link to={cipherPath} />
            </MenuItem>
            <MenuItem icon={textIcon("H")} active={isHashActive()}>
              {hashPageName} <Link to={hashPath} />
            </MenuItem>
            <MenuItem icon={<BsLockFill />} active={isHmacActive()}>
              {hmacPageName} <Link to={hmacPath} />
            </MenuItem>
            <MenuItem icon={<BsLink45Deg />} active={isUrlActive()}>
              {urlPageName} <Link to={urlPath} />
            </MenuItem>
            <MenuItem icon={textIcon("64")} active={isBase64Active()}>
              {base64PageName} <Link to={base64Path} />
            </MenuItem>
          </Menu>
        </ProSidebar>
      </aside>
      <main className="content">
        <Header text={props.headerText} />
        <div className="page-content container py-3">{props.children}</div>
        <Footer bgColor={props.color} linkColor={props.linkColor} />
      </main>
    </div>
  );
}
