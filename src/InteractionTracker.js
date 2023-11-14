// src/InteractionTracker.js
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InteractionTracker = ({ componentsOrder, componentMap }) => {
  const [interactionData, setInteractionData] = useState({});
  const [renderOrder, setRenderOrder] = useState([]);

  useEffect(() => {
    // Load existing interaction data from local storage
    const loadInteractionData = async () => {
      try {
        const existingData = await AsyncStorage.getItem('interactionData');
        if (existingData) {
          setInteractionData(JSON.parse(existingData));

          // Update the rendering order based on interaction data
          const sortedComponents = componentsOrder.slice().sort((a, b) => {
            const interactionsA = interactionData[a] || {};
            const interactionsB = interactionData[b] || {};

            const totalInteractionsA = (interactionsA.clicks || 0) + (interactionsA.focusDuration || 0);
            const totalInteractionsB = (interactionsB.clicks || 0) + (interactionsB.focusDuration || 0);

            return totalInteractionsB - totalInteractionsA;
          });

          setRenderOrder(sortedComponents);
        } else {
          // If the database doesn't exist, set the initial order
          setRenderOrder(componentsOrder);
        }
      } catch (error) {
        console.error('Error loading interaction data:', error);
      }
    };

    loadInteractionData();
  }, []);

  // Interaction tracking logic
  const trackInteraction = async (componentName, interactionType) => {
    const timestamp = Date.now();

    if (interactionType === 'click') {
      setInteractionData((prevData) => ({
        ...prevData,
        [componentName]: {
          ...prevData[componentName],
          clicks: (prevData[componentName]?.clicks || 0) + 1,
        },
      }));
    } else if (interactionType === 'focus') {
      setInteractionData((prevData) => ({
        ...prevData,
        [componentName]: {
          ...prevData[componentName],
          focusStartTime: timestamp,
        },
      }));
    } else if (interactionType === 'blur') {
      setInteractionData((prevData) => ({
        ...prevData,
        [componentName]: {
          ...prevData[componentName],
          focusDuration: (prevData[componentName]?.focusDuration || 0) + Math.floor((timestamp - prevData[componentName]?.focusStartTime) / 1000),
        },
      }));
    }

    // Save interaction data to local storage
    try {
      const newData = { ...interactionData, [componentName]: interactionData[componentName] };
      await AsyncStorage.setItem('interactionData', JSON.stringify(newData));
      console.log("saving", JSON.stringify(newData))
    } catch (error) {
      console.error('Error saving interaction data:', error);
    }
  };

  // Basic rendering logic using the current rendering order
  const orderedComponents = renderOrder.map((componentName) => {
    const Component = componentMap[componentName];
    return (
      <div
        key={componentName}
        onClick={() => trackInteraction(componentName, 'click')}
        onFocus={() => trackInteraction(componentName, 'focus')}
        onBlur={() => trackInteraction(componentName, 'blur')}
      >
        <Component />
      </div>
    );
  });

  return (
    <>
      {orderedComponents}
    </>
  );
};

export default InteractionTracker;
