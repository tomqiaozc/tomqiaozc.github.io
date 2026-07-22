(() => {
  const values = [0,0,0,0,0,0,0,0,0,0,0,0,0,3.7,2,0,0,0,0,11.3,20.4,18.3,33.6,0,0,9.5,17,6.3,7.5,2.6,0,0,.5688,19.4,13.2,0,0,0,0,0,6.2,18.6,12.4,40.7,.4357,0,0,0,0,0,0,0,0,0,6.5,6.1,13,18.9,24.1,0,41.8,31.1,7.5,7.6,17.8,0,0,11.9,6.5,8.9,6.7,2.1,.8986,2.7,5.3,11,13,45.8,45.8,1.5,0,17,116,120.5,79.8,241,404.9,0,107.1,83.9,414.2,150.8,15.1,0,0,0,91.3,187.6,144.2,5.1,16.2,158.2,12.2,210.2,516.5,1200,907,25.9,19.3,157.3,11600,2000,1500,1000,969.7,708.9,46.4,329.3,95.1,153.5,1.5,0,0,1.9,1.7,157.8,190.3,485.3,6.7,0,423.2,32.6,19.5,44.5,1.2,0,0,2.3,1.6,568.9,265.3,527.3,0,0,125.7,74.4,218.1,13.2,5.4,2.8,124.4,606.6,670.4,358.8,363.3,123.7,5.3,0,850.4,175.3,75.9,120.8,338.9,0,0,346,183.9,162.3,15.2,0,0,0,47.1,.1201,288.9,274.2,17.3,0,0,10,27.5,2.5,425.5,0,0,0,62.9,2.4,10.1,.2191,.2982,0,0,0,0,163.4,53.4,93.9,155.4,0,191.8,286.4];
  const heatmap = document.querySelector('#tokenHeatmap');
  const months = document.querySelector('#heatMonths');
  if (!heatmap || !months) return;
  const start = new Date('2026-01-01T00:00:00');
  const offset = (start.getDay() + 6) % 7;
  const level = (v) => !v ? '' : v < 10 ? 'l1' : v < 50 ? 'l2' : v < 200 ? 'l3' : 'l4';
  const format = (v) => v >= 1000 ? `${(v / 1000).toFixed(1)}B` : v >= 1 ? `${v.toFixed(1)}M` : `${(v * 1000).toFixed(1)}K`;
  for (let i = 0; i < offset; i += 1) heatmap.append(Object.assign(document.createElement('span'), { className: 'heat-cell' }));
  for (let day = 0; day < 365; day += 1) {
    const date = new Date(start); date.setDate(start.getDate() + day);
    const value = values[day] || 0;
    const cell = Object.assign(document.createElement('span'), { className: `heat-cell ${level(value)}`, title: `${date.toISOString().slice(0, 10)} · ${value ? format(value) : '0'} tokens` });
    heatmap.append(cell);
  }
  ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].forEach((name, month) => {
    const first = new Date(2026, month, 1);
    const days = Math.floor((first - start) / 86400000) + offset;
    const label = Object.assign(document.createElement('span'), { textContent: name });
    label.style.gridColumn = `${Math.floor(days / 7) + 1} / span 4`;
    months.append(label);
  });
})();
