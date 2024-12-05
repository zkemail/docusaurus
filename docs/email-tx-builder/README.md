import DocCardList from '@theme/DocCardList';

# Overview

<div style={{fontSize: '1.2em'}}>
Learn how to send transaction via email commands using the Email Transaction Builder.
</div>

The **Email Transaction Builder** allows users to send transactions to a smart contract by sending email commands. Developers can define [**Command Templates**](/email-tx-builder/architecture/command-templates) in their smart contracts and trigger transactions by sending email commands to the Generic Relayer API.

The Generic Relayer is a service that sends the emails to the user and generates the proofs for creating the EmailAuthMsg used to authenticate the transaction.

## Learn more

Learn how the Email Transaction Builder send the emails and generates the proofs for creating the EmailAuthMsg used to authenticate the transaction. And how to integrate the Email Transaction Builder into your existing projects.

<DocCardList 
  items={[
    {
      type: 'link',
      label: 'Architecture',
      href: 'architecture',
      description: 'Learn about the Email Transaction Builder architecture.'
    },
    {
      type: 'link',
      label: 'Setup',
      href:  'setup',
      description: 'Learn how to integrate the Email Transaction Builder into your project.'
    }
  ]}
/>


## Getting Started

Get started with our template repository that includes deployment scripts and a TypeScript CLI to interact with the Generic Relayer API. Follow our quickstart guide to deploy the contracts and start sending transactions with any of these [type matchers](/email-tx-builder/architecture/command-templates#available-type-matchers) in minutes.


<DocCardList 
  items={[
    {
      type: 'link',
      label: 'Quickstart',
      href: 'quickstart',
      description: 'Get started with the Email Transaction Builder with an example project.'
    }
  ]}
/>
