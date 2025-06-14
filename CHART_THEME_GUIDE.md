# Chart Dark Mode Implementation Guide

## Overview

All chart components in this blog now support automatic dark/light mode detection and will adapt their colors, backgrounds, and styling based on the current theme. This provides a seamless experience for users who prefer different themes.

## Features

### 🎨 Automatic Theme Detection
- Charts detect the current theme using the `data-theme` attribute on `document.documentElement`
- Supports both 'light' and 'dark' themes
- Defaults to 'dark' theme if no theme is detected

### 🔄 Real-time Theme Switching
- Charts update instantly when users toggle between themes
- No page reload required
- Smooth transitions for background and border changes

### 🎯 Accessible Color Schemes
- High contrast colors optimized for both light and dark themes
- Text and grid lines automatically adjust for readability
- Chart containers have appropriate shadows and borders for each theme

### 📱 Responsive Design
- All theme adaptations work across different screen sizes
- Mobile-optimized layouts maintained

## Updated Components

### 1. ModularChart.astro
Most flexible chart component with full theme support:
```astro
<ModularChart 
  type="line"
  data={chartData}
  options={chartOptions}
  width={500}
  height={300}
/>
```

### 2. Chart.astro
Standard chart component with theme awareness:
```astro
<Chart 
  type="bar"
  data={chartData}
  options={chartOptions}
/>
```

### 3. SimpleChart.astro
Lightweight chart component:
```astro
<SimpleChart 
  type="pie"
  data={chartData}
/>
```

### 4. LineChart.astro
Specialized line chart with enhanced theme support:
```astro
<LineChart 
  title="Sample Chart"
  xLabel="Time"
  yLabel="Value"
  labels={labels}
  datasets={datasets}
/>
```

### 5. ScatterChart.astro
Scatter plot with theme-aware styling:
```astro
<ScatterChart 
  title="Data Distribution"
  xLabel="X Axis"
  yLabel="Y Axis"
  data={scatterData}
/>
```

### 6. ChartRenderer.astro
Dynamic chart renderer for markdown content:
```astro
<ChartRenderer charts={chartArray} />
```

## Color Schemes

### Light Theme
- **Background**: `#ffffff` (white)
- **Text**: `#1a202c` (dark gray)
- **Grid**: `rgba(0, 0, 0, 0.1)` (light gray)
- **Border**: `rgba(0, 0, 0, 0.1)` (light gray)
- **Shadow**: `rgba(0, 0, 0, 0.1)` (subtle shadow)

### Dark Theme
- **Background**: `#2d3748` (dark gray)
- **Text**: `#e2e8f0` (light gray)
- **Grid**: `rgba(255, 255, 255, 0.1)` (dark white)
- **Border**: `rgba(255, 255, 255, 0.1)` (dark white)
- **Shadow**: `rgba(0, 0, 0, 0.3)` (stronger shadow)

## CSS Variables

Charts use CSS variables for consistent theming:

```css
/* Container styling with theme variables */
.chart-container {
  background: var(--chart-background, #ffffff);
  box-shadow: 0 2px 10px var(--chart-shadow, rgba(0, 0, 0, 0.1));
  border: 1px solid var(--chart-border, rgba(0, 0, 0, 0.1));
  transition: background-color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

/* Light theme variables */
:global([data-theme="light"]) .chart-container {
  --chart-background: #ffffff;
  --chart-shadow: rgba(0, 0, 0, 0.1);
  --chart-border: rgba(0, 0, 0, 0.1);
  --chart-text-color: #1a202c;
  --chart-grid-color: rgba(0, 0, 0, 0.1);
}

/* Dark theme variables */
:global([data-theme="dark"]) .chart-container {
  --chart-background: #2d3748;
  --chart-shadow: rgba(0, 0, 0, 0.3);
  --chart-border: rgba(255, 255, 255, 0.1);
  --chart-text-color: #e2e8f0;
  --chart-grid-color: rgba(255, 255, 255, 0.1);
}
```

## JavaScript Implementation

### Theme Detection Function
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

### Theme Change Listener
```javascript
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
      updateChartColors();
    }
  });
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-theme']
});
```

## Usage Examples

### Basic Usage
```astro
---
import ModularChart from '../components/ModularChart.astro';

const data = {
  labels: ['Jan', 'Feb', 'Mar'],
  datasets: [{
    label: 'Sales',
    data: [10, 20, 15]
  }]
};
---

<ModularChart type="line" data={data} />
```

### Advanced Usage with Custom Options
```astro
---
const options = {
  scales: {
    y: {
      beginAtZero: true
    }
  },
  plugins: {
    title: {
      display: true,
      text: 'Custom Chart Title'
    }
  }
};
---

<ModularChart 
  type="bar" 
  data={data} 
  options={options}
  width={600}
  height={400}
/>
```

## Testing

To test the theme functionality:

1. Visit any page with charts
2. Use the theme toggle button in the header
3. Observe that charts automatically update their colors
4. Check that text remains readable in both themes
5. Verify that container backgrounds and borders adapt

## Migration from Old Charts

If you have existing charts that don't support themes:

1. Replace the old chart component with one of the updated versions
2. No changes needed to your data or options
3. Charts will automatically inherit theme support
4. Test with both light and dark themes

## Performance Considerations

- Theme detection is lightweight and cached
- Chart updates use Chart.js's `update('none')` for optimal performance
- CSS transitions provide smooth visual feedback
- MutationObserver only listens for specific attribute changes

## Browser Support

This implementation works with all modern browsers that support:
- MutationObserver API
- CSS Custom Properties (variables)
- Chart.js 3.x+

## Troubleshooting

### Charts not updating theme
- Check that the chart component is one of the updated versions
- Verify that `data-theme` attribute is being set on `document.documentElement`
- Ensure Chart.js is loaded before chart initialization

### Colors not displaying correctly
- Check browser console for JavaScript errors
- Verify that CSS variables are properly defined
- Test with a hard page refresh

### Performance issues
- Ensure only one MutationObserver per chart
- Check that chart instances are properly stored and reused
- Use `update('none')` for instant updates without animations
