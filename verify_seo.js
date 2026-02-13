const fs = require('fs');
const path = require('path');

const locales = ['en', 'ua', 'pl', 'de', 'es', 'fr', 'it', 'pt'];
const dictPath = './src/infrastructure/i18n/dictionaries';

console.log('# SEO CONTENT DEPTH AUDIT');
console.log('| Locale | Philosophy | Methodology | Enterprise | Solo Pack | Total | Status |');
console.log('|--------|------------|-------------|------------|-----------|-------|--------|');

locales.forEach(lang => {
    try {
        const filePath = path.join(dictPath, `${lang}.json`);
        const dict = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        const counts = {
            philosophy: 0,
            methodology: 0,
            enterprise: 0,
            solo: 0
        };

        // Philosophy
        const philText = (dict.philosophy.intro || '') + ' ' +
            Object.values(dict.philosophy.principles || {}).map(p => p.text).join(' ');
        counts.philosophy = philText.trim().split(/\s+/).length;

        // Methodology
        const methText = Object.values(dict.methodology.layers || {}).map(l => l.description).join(' ');
        counts.methodology = methText.trim().split(/\s+/).length;

        // Enterprise
        const entText = (dict.enterprise.description || '') + ' ' +
            (dict.enterprise.pitch.problem || '') + ' ' +
            (dict.enterprise.pitch.solution || '');
        counts.enterprise = entText.trim().split(/\s+/).length;

        // Solo
        const soloText = (dict.solo.description || '') + ' ' +
            Object.values(dict.solo.benefits || {}).filter(b => typeof b === 'string').join(' ');
        counts.solo = soloText.trim().split(/\s+/).length;

        const total = counts.philosophy + counts.methodology + counts.enterprise + counts.solo;
        const status = total >= 1000 ? '✅ PASS' : '⚠️ LOW';

        console.log(`| ${lang.toUpperCase()} | ${counts.philosophy} | ${counts.methodology} | ${counts.enterprise} | ${counts.solo} | ${total} | ${status} |`);
    } catch (err) {
        console.log(`| ${lang.toUpperCase()} | ERROR | ERROR | ERROR | ERROR | ERROR | ❌ FAIL |`);
    }
});
