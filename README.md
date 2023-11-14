# IntelligentUI

![License](https://img.shields.io/badge/license-MIT-blue.svg)

React Native Interaction Tracker is a package that helps you track and prioritize the rendering order of components based on user interactions.

## Features

- Track user interactions, including clicks and focus duration.
- Store interaction data in local storage.
- Dynamically update the rendering order based on user interactions.

## Installation

```bash
npm i @intelligent_ui/intelligent_ui
```

## Usage

    import React from 'react';
    import InteractionTracker from '@intelligent_ui/intelligent_ui';
    
    // Define your initial component order
    export const INITIAL_COMPONENT_ORDER = ['Component1', 'Component2', 'Component3', 'Component4', 'Component5'];
    
    // Define your component map
    export const COMPONENT_MAP = {
      Component1: <Component1 />,
      Component2: <Component2 />,
      Component3: <Component3 />,
      Component4: <Component4 />,
      Component5: <Component5 />,
    };
    
    // Example usage in your component
    function MyScreen() {
      return (
        <InteractionTracker componentsOrder={INITIAL_COMPONENT_ORDER} componentMap={COMPONENT_MAP} />
      );
    }
    
    export default MyScreen;

## Props

`componentsOrder`: An array representing the initial order of components.
`componentMap`: An object mapping component names to their corresponding components.

## Contribution

We welcome contributions! If you want to contribute to this project, follow these steps:

Fork the repository.

Create a new branch for your feature: git checkout -b feature-name.

Commit your changes: git commit -m 'Add feature-name'.

Push to the branch: git push origin feature-name.

Submit a pull request.
