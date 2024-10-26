import React from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';

export default function NavbarLogo(): JSX.Element {
  const {colorMode} = useColorMode();

  return (
    <Link
      to="/"
      className="navbar__brand"
      aria-label="Home page">
      <img
        className="navbar__logo"
        src="/img/zk-email-logo.svg"
        alt="Logo"
        width={128}
        style={{
          filter: colorMode === 'dark' ? 'invert(100%) saturate(137%) hue-rotate(316deg) brightness(106%) contrast(94%)' : 'none',
        }}
      />
    </Link>
  );
}
