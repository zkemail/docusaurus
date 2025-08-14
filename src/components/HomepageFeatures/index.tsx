import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
  link?: {
    text: string;
    url: string;
  };
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Privacy-Preserving Email Verification',
    description: (
      <>
        A cryptographic protocol enabling users to prove email ownership and content 
        without revealing sensitive information. Built on zero-knowledge proofs and 
        DKIM signatures.
      </>
    ),
    link: {
      text: 'Read the paper →',
      url: '/docs/introduction'
    }
  },
  {
    title: 'Decentralized Identity Infrastructure',
    description: (
      <>
        Transform existing email systems into a universal identity layer for Web3. 
        No modifications to email providers required—leveraging existing DKIM 
        infrastructure.
      </>
    ),
    link: {
      text: 'Technical overview →',
      url: '/docs/architecture/overview'
    }
  },
  {
    title: 'Open Source Implementation',
    description: (
      <>
        Production-ready SDK and smart contracts for building privacy-preserving 
        applications. Actively maintained by researchers and developers worldwide.
      </>
    ),
    link: {
      text: 'View on GitHub →',
      url: 'https://github.com/zkemail'
    }
  },
];

function Feature({title, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.feature}>
        <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
        <p className={styles.featureDescription}>{description}</p>
        {link && (
          <a href={link.url} className={styles.featureLink}>
            {link.text}
          </a>
        )}
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresIntro}>
          <p className={styles.abstract}>
            ZK Email is a cryptographic protocol for anonymous email verification. 
            By combining zero-knowledge proofs with existing email infrastructure, 
            we enable privacy-preserving identity systems without trusted third parties.
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}