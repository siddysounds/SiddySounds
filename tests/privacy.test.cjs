const {test} = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');

function environment({saved, signal = false, storageBlocked = false} = {}) {
  const elements = [];
  const scripts = [];
  let reloads = 0;
  let stored = saved;
  class Element {
    constructor(tag) { this.tag = tag; this.events = {}; this.children = []; this.queries = {}; this.attrs = {}; elements.push(this); }
    setAttribute(name, value) { this.attrs[name] = value; }
    removeAttribute(name) { delete this.attrs[name]; }
    querySelector(selector) { return this.queries[selector] ||= new Element('control'); }
    appendChild(child) { this.children.push(child); if (child.tag === 'script') scripts.push(child); }
    addEventListener(type, callback) { this.events[type] = callback; }
    showModal() { this.attrs.open = true; }
    close() { delete this.attrs.open; }
    focus() {}
  }
  const window = { addEventListener() {} };
  const document = {currentScript:{hasAttribute:()=>true},cookie:'',head:new Element('head'),body:new Element('body'),createElement:tag=>new Element(tag)};
  const context = {window,document,navigator:{globalPrivacyControl:signal},location:{hostname:'www.siddysounds.com',reload:()=>reloads++},localStorage:{getItem:()=>{if(storageBlocked)throw Error('blocked');return stored;},setItem:(_,value)=>{if(storageBlocked)throw Error('blocked');stored=value;}},Date,JSON,Number,Boolean};
  vm.runInNewContext(fs.readFileSync(path.join(root,'js/privacy.js'),'utf8'),context);
  return {context,elements,scripts,get stored(){return stored;},get reloads(){return reloads;},banner:elements.find(e=>e.className==='privacy-banner'),dialog:elements.find(e=>e.className==='privacy-dialog')};
}
const saved = analytics => JSON.stringify({version:2,analytics,savedAt:Date.now()});
test('no analytics request before an explicit choice, including unavailable storage',()=>{
  for(const options of [{},{storageBlocked:true},{saved:'not json'},{saved:JSON.stringify({version:1,analytics:true,savedAt:Date.now()})}]) {
    const env=environment(options); assert.equal(env.scripts.length,0); assert.equal(env.banner.hidden,false);
  }
});
test('accept loads only Google Analytics once; withdrawal stops and reloads',()=>{
  const env=environment();
  env.banner.querySelector('[data-choice="accept"]').events.click();
  assert.equal(env.scripts.length,1); assert.match(env.scripts[0].src,/googletagmanager\.com/);
  env.banner.querySelector('[data-choice="accept"]').events.click(); assert.equal(env.scripts.length,1);
  env.dialog.querySelector('input').checked=false;env.dialog.querySelector('[data-save]').events.click();
  assert.equal(JSON.parse(env.stored).analytics,false);assert.equal(env.context.window['ga-disable-G-25HPYYD2GT'],true);assert.equal(env.reloads,1);
});
test('reject, expired consent, and browser privacy signals never enable analytics',()=>{
  const rejected=environment(); rejected.banner.querySelector('[data-choice="reject"]').events.click(); assert.equal(rejected.scripts.length,0);
  assert.equal(environment({saved:saved(false)}).scripts.length,0);
  assert.equal(environment({saved:JSON.stringify({version:2,analytics:true,savedAt:Date.now()-181*86400000})}).scripts.length,0);
  const signal=environment({saved:saved(true),signal:true}); assert.equal(signal.scripts.length,0);
  signal.banner.querySelector('[data-choice="accept"]').events.click();assert.equal(signal.scripts.length,0);
});
test('2048 merges each tile once and preserves gaps and scoring',()=>{
  const context={document:{addEventListener(){}}};vm.runInNewContext(fs.readFileSync(path.join(root,'games/21-2048-Game/script.js'),'utf8'),context);
  for(const [input,expected,gained] of [[[2,2,2,2],[4,4,0,0],8],[[2,2,4,0],[4,4,0,0],4],[[0,4,0,4],[8,0,0,0],8],[[0,0,0,0],[0,0,0,0],0]]) {
    const result=context.merge2048Line(input);assert.deepEqual(Array.from(result.values),expected);assert.equal(result.gained,gained);
  }
});
test('all JavaScript files and executable inline scripts parse',()=>{
  let checked=0;
  function walk(directory){for(const entry of fs.readdirSync(directory,{withFileTypes:true})){const file=path.join(directory,entry.name);if(entry.isDirectory())walk(file);else if(file.endsWith('.js')){new vm.Script(fs.readFileSync(file,'utf8').replace(/^import .+;\n/gm,''),{filename:file});checked++;}else if(file.endsWith('.html')){for(const match of fs.readFileSync(file,'utf8').matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)){if(/application\/ld\+json/.test(match[1])||!match[2].trim())continue;new vm.Script(match[2].replace(/^import .+;\n/gm,''),{filename:file});checked++;}}}}
  walk(root);assert.ok(checked>40);
});
