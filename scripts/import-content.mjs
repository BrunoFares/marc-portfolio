// One-time, repeatable migration. Run: node scripts/import-content.mjs /path/to/marc-website
import fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';
const source = path.resolve(process.argv[2] || '../marc-website');
const output = path.resolve('public/original-site');
fs.mkdirSync(output, { recursive: true });
for (const folder of ['content', 'data', 'transcriptions', 'assets', 'static']) {
  fs.cpSync(path.join(source, folder), path.join(output, folder), { recursive: true });
}
fs.mkdirSync('public/uploads', { recursive: true });
fs.mkdirSync('public/images', { recursive: true });
fs.mkdirSync('data', { recursive: true });
fs.copyFileSync(path.join(source, 'static/uploads/resume.pdf'), 'public/uploads/resume.pdf');
fs.copyFileSync(path.join(source, 'assets/media/authors/me.png'), 'public/images/marc-fares.png');
fs.copyFileSync(path.join(source, 'content/publications/preprint/cite.bib'), 'public/uploads/markov-triangles.bib');
fs.copyFileSync(path.join(source, 'LICENSE.md'), path.join(output, 'LICENSE.md'));
const parse = (file) => {
  const raw = fs.readFileSync(file, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  return { meta: match ? yaml.load(match[1]) : {}, body: match ? raw.slice(match[0].length) : raw };
};
const records = [];
for (const category of ['blog', 'projects', 'slides']) {
  for (const folder of fs.readdirSync(path.join(source, 'content', category), { withFileTypes: true }).filter(x => x.isDirectory())) {
    const relative = `content/${category}/${folder.name}/index.md`;
    const { meta, body } = parse(path.join(source, relative));
    const base = `/original-site/content/${category}/${folder.name}`;
    const files = fs.readdirSync(path.join(source, 'content', category, folder.name));
    const cover = files.find(x => /^featured\.(jpg|png)$/.test(x));
    records.push({ slug: `${category}/${folder.name}`, category: category === 'blog' ? 'Blog' : category === 'projects' ? 'Projects' : 'Slides', title: meta.title, summary: meta.summary || body.split('<!--more-->')[0].trim(), date: meta.date || '', tags: meta.tags || [], authors: meta.authors || [], imageCaption: meta.image?.caption || '', body, base, image: cover ? `${base}/${cover}` : null, original: `/original-site/${relative}`, links: meta.links || [], attachments: files.filter(x => !/^(index\.md|featured\.|cover\.)/.test(x)).map(x => ({ name: x, url: `${base}/${x}` })) });
  }
}
const noteDir = path.join(source, 'transcriptions/imo-number-theory');
for (const file of fs.readdirSync(noteDir).filter(x => x.endsWith('.mdx')).sort()) {
  const { meta, body } = parse(path.join(noteDir, file));
  records.push({ slug: `notes/${file.replace('.mdx','')}`, category: 'Notes', title: meta.title, summary: `${meta.source} · Source page ${meta.source_page}`, date: '', tags: ['Number Theory'], authors: [], imageCaption: '', body, base: '/original-site/transcriptions/imo-number-theory', image: null, original: `/original-site/transcriptions/imo-number-theory/${file}`, links: [], attachments: [] });
}
const author = yaml.load(fs.readFileSync(path.join(source, 'data/authors/me.yaml'), 'utf8'));
const home = parse(path.join(source, 'content/_index.md'));
const research = home.meta.sections.find(x => x.block === 'markdown').content;
const cta = home.meta.sections.find(x => x.block === 'cta-card').content;
records.push({ slug: 'template/original-content', category: 'Template', title: 'Original site content', summary: 'The original research statement, education summary, social links, and HugoBlox introduction.', date: '', tags: ['Original template'], authors: [], imageCaption: '', body: `## ${research.title}\n\n${research.text}\n\n## PhD education summary\n\n${author.education[0].summary}\n\n[${author.education[0].button.text}](/uploads/resume.pdf)\n\n## Original social links\n\n${author.links.map(x => `[${x.label || x.icon}](${x.url})`).join('\n\n')}\n\n## ${cta.title}\n\n${cta.text}\n\n[${cta.button.text}](${cta.button.url})`, base: '/original-site', image: null, original: '/original-site/content/_index.md', links: [], attachments: [{name: 'Original author profile', url:'/original-site/data/authors/me.yaml'}] });
fs.writeFileSync('data/archive.json', JSON.stringify(records, null, 2));
fs.writeFileSync('data/profile.json', JSON.stringify(author, null, 2));
const publication = parse(path.join(source, 'content/publications/preprint/index.md'));
fs.writeFileSync('data/publication.json', JSON.stringify({...publication.meta, citation: fs.readFileSync(path.join(source, 'content/publications/preprint/cite.bib'), 'utf8')}, null, 2));
console.log(`Imported ${records.length} archive pages, profile, publication, and all original content/assets.`);
