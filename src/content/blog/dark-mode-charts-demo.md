---
title: "Dark Mode Chart Demo"
date: "2025-06-14"
image: "/nico-grassetto-blog/images/azure.jpg"
description: "Demonstration of theme-aware charts that adapt to dark and light modes"
---

# Dark Mode Chart Demo

This page demonstrates how our charts automatically adapt to dark and light themes. Try toggling the theme using the button in the header to see the charts change colors dynamically!

## Features

- **Automatic theme detection**: Charts detect the current theme and apply appropriate colors
- **Real-time updates**: When you switch themes, charts update instantly without reload
- **Accessible colors**: Color palettes are optimized for readability in both modes
- **Consistent styling**: All chart containers and backgrounds adapt to the theme

## Sample Charts

### Line Chart
```astro
---
import LineChart from '../components/LineChart.astro';

const salesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Sales',
    data: [12, 19, 3, 5, 2, 3]
  }]
};
---

<LineChart 
  title="Monthly Sales"
  xLabel="Month" 
  yLabel="Sales (K)" 
  labels={salesData.labels}
  datasets={salesData.datasets}
  width={600}
  height={400}
/>
```

### Modular Chart
```astro
---
import ModularChart from '../components/ModularChart.astro';

const pieData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [{
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: [
      '#ef4444',
      '#3b82f6', 
      '#f59e0b',
      '#10b981',
      '#8b5cf6',
      '#f97316'
    ]
  }]
};
---

<ModularChart 
  type="pie"
  data={pieData}
  options={{ title: "Sample Distribution" }}
  width={400}
  height={300}
/>
```

## Technical Implementation

### Theme Detection
Charts use the `data-theme` attribute on the document element to determine the current theme:

```javascript
function getThemeColors() {
  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
  
  if (theme === 'light') {
    return {
      textColor: '#1a202c',
      gridColor: 'rgba(0, 0, 0, 0.1)',
      backgroundColor: '#ffffff',
      borderColor: 'rgba(0, 0, 0, 0.2)'
    };
  } else {
    return {
      textColor: '#e2e8f0',
      gridColor: 'rgba(255, 255, 255, 0.1)',
      backgroundColor: '#2d3748',
      borderColor: 'rgba(255, 255, 255, 0.2)'
    };
  }
}
```

### Real-time Updates
Charts listen for theme changes using a MutationObserver:

```javascript
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
      updateChartColors(chart);
    }
  });
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-theme']
});
```

### CSS Variables
Chart containers use CSS variables for theme-aware styling:

```css
.chart-container {
  background: var(--chart-background, #ffffff);
  box-shadow: 0 2px 10px var(--chart-shadow, rgba(0, 0, 0, 0.1));
  border: 1px solid var(--chart-border, rgba(0, 0, 0, 0.1));
  transition: background-color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

/* Light theme */
:global([data-theme="light"]) .chart-container {
  --chart-background: #ffffff;
  --chart-shadow: rgba(0, 0, 0, 0.1);
  --chart-border: rgba(0, 0, 0, 0.1);
}

/* Dark theme */
:global([data-theme="dark"]) .chart-container {
  --chart-background: #2d3748;
  --chart-shadow: rgba(0, 0, 0, 0.3);
  --chart-border: rgba(255, 255, 255, 0.1);
}
```

## Benefits

1. **Better User Experience**: Charts are always readable in the user's preferred theme
2. **Accessibility**: High contrast colors ensure readability for all users
3. **Performance**: Smooth transitions without page reloads
4. **Consistency**: All chart types follow the same theming rules
5. **Maintenance**: Centralized theme logic makes updates easy

Try switching between light and dark modes to see the charts adapt in real-time!
