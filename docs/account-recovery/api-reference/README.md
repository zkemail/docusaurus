# API Reference

This API Reference provides detailed documentation for the core interfaces, contracts, modules, factories, handlers, and libraries that make up the email-based account recovery system. It includes:

## Core Contracts

- EmailRecoveryManager: The main contract managing the email recovery process.
- GuardianManager: Manages guardians for account recovery.

## Modules

- EmailRecoveryModule: Implements the core functionality for email-based recovery.

## Factories

- EmailRecoveryFactory: Facilitates the deployment of email recovery modules and their associated subject handlers.

## Command Handlers

- EmailRecoverySubjectHandler: Implements the default subject handler for email recovery.
- AccountHidingRecoverySubjectHandler: Provides a subject handler that doesn't expose the account address in email subjects.
- SafeRecoverySubjectHandler: Implements a custom subject handler for Safe accounts.

## Interfaces

- IEmailRecoveryModule: Defines the basic functionality for email recovery modules.
- IEmailRecoveryManager: Outlines the structure and functionality for managing email-based account recovery processes.
- IEmailRecoverySubjectHandler: Specifies how to handle and validate email subjects for recovery processes.
- IGuardianManager: Defines the functionality for managing guardians in the context of account recovery.
- ISafe: Provides methods for interacting with Safe smart contract accounts.

## Libraries

- EnumerableGuardianMap: Implements a data structure for managing guardians.
- StringUtils: Provides utility functions for string manipulation.
