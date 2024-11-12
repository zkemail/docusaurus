import React from 'react';
import Link from '@docusaurus/Link';

export default function NavbarLogo(): JSX.Element {
  return (
    <Link
      to="/"
      className="navbar__brand"
      aria-label="Home page">
      <img
        className="navbar__logo"
        src="/img/zk-email-logo.svg"
        alt="ZK EmailLogo"
        width={128}
        style={{
          filter: 'var(--navbar-logo-filter)'
        }}
      />
    </Link>
  );
}
