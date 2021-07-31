import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { BsLink45Deg, BsLockFill } from "react-icons/bs";
import { SiJsonwebtokens } from "react-icons/si";
import { VscJson } from "react-icons/vsc";
import { FaKey, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { path as hashPath, pageName as hashPageName } from "./hash-page";
import { path as hmacPath, pageName as hmacPageName } from "./hmac-page";
import { path as cipherPath, pageName as cipherPageName } from "./cipher-page";
import { path as jwePath, pageName as jwePageName } from "./jwe-page";
import { path as urlPath, pageName as urlPageName } from "./url-page";
import { path as base64Path, pageName as base64PageName } from "./base64-page";
import { path as jsonPath, pageName as jsonPageName } from "./json-page";
import { path as pbkdf2Path, pageName as pbkdf2PageName } from "./pbkdf2-page";

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
  const isJsonActive = () => location.pathname === jsonPath;
  const isPbkdf2Active = () => location.pathname === pbkdf2Path;

  const textIcon = (text) => <strong className="m-0 arial">{text}</strong>;

  return (
    <div className="layout">
      <aside>
        <ProSidebar collapsed={collapsed}>
          <SidebarHeader>
            <Menu iconShape="square">
              <MenuItem icon={<MdMenu />} onClick={toggleCollapsed}>
                Online DevTools
              </MenuItem>
            </Menu>
          </SidebarHeader>
          <Menu iconShape="square">
            <MenuItem icon={<SiJsonwebtokens />} active={isJweActive()}>
              <Link to={jwePath[1]}>{jwePageName}</Link>
            </MenuItem>
            <MenuItem icon={textIcon("C")} active={isCipherActive()}>
              <Link to={cipherPath}>{cipherPageName}</Link>
            </MenuItem>
            <MenuItem icon={textIcon("H")} active={isHashActive()}>
              <Link to={hashPath}>{hashPageName}</Link>
            </MenuItem>
            <MenuItem icon={<BsLockFill />} active={isHmacActive()}>
              <Link to={hmacPath}>{hmacPageName}</Link>
            </MenuItem>
            <MenuItem icon={<FaKey />} active={isPbkdf2Active()}>
              <Link to={pbkdf2Path}>{pbkdf2PageName}</Link>
            </MenuItem>
            <MenuItem icon={<BsLink45Deg />} active={isUrlActive()}>
              <Link to={urlPath}>{urlPageName}</Link>
            </MenuItem>
            <MenuItem icon={textIcon("64")} active={isBase64Active()}>
              <Link to={base64Path}>{base64PageName}</Link>
            </MenuItem>
            <MenuItem icon={<VscJson />} active={isJsonActive()}>
              <Link to={jsonPath}>{jsonPageName}</Link>
            </MenuItem>
          </Menu>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FaGithub />}>
                <a href="https://github.com/aurasphere/online-devtools/">
                  View Source
                </a>
              </MenuItem>
              <MenuItem icon={<FaLinkedinIn />}>
                <a href="https://www.linkedin.com/in/donato-rimenti-764876132/">
                  Author
                </a>
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </aside>
      <main className="content">
        <div className="fill-flex">
          <div className="header d-flex justify-content-center bg-primary align-items-center">
            <h3 className="text-light">{props.headerText}</h3>
          </div>
        </div>
        <div className="page-content container py-3">{props.children}</div>
      </main>
    </div>
  );
}
