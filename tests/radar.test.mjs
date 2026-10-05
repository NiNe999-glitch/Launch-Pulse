import test from 'node:test';
import assert from 'node:assert/strict';
import { opportunities, filterOpportunities, parseSaved, createBrief, escapeHtml, SOURCE } from '../data.js';
test('combined filters select only matching format, topic, query and saved ID',()=>{
 assert.deepEqual(filterOpportunities(opportunities,{language:'es',query:'plataformas',topic:'platforms',format:'video',savedOnly:true,saved:['platforms']}).map(x=>x.id),['platforms']);
 assert.equal(filterOpportunities(opportunities,{topic:'platforms',format:'short'}).length,0);
 assert.equal(filterOpportunities(opportunities,{savedOnly:true}).length,0);
});
test('search supports accents and English',()=>{
 assert.ok(filterOpportunities(opportunities,{query:'trailer'}).some(x=>x.id==='trailer-analysis'));
 assert.ok(filterOpportunities(opportunities,{language:'en',query:'ANNOUNCED'}).some(x=>x.id==='platforms'));
 assert.equal(filterOpportunities(opportunities,{query:'unmatched phrase 12345'}).length,0);
});
test('corrupt or stale local storage cannot inject favorite IDs',()=>{
 for(const x of [null,'broken','{}','123','null'])assert.deepEqual(parseSaved(x),[]);
 assert.deepEqual(parseSaved('["platforms","platforms","invalid",8]'),['platforms']);
});
test('every exported brief contains source, limitations and localized content',()=>{
 assert.equal(new Set(opportunities.map(x=>x.id)).size,opportunities.length);
 for(const item of opportunities)for(const lang of ['es','en']){
  assert.equal(item[lang].titles.length,5);assert.equal(item[lang].hooks.length,3);
  const brief=createBrief(item,lang);assert.ok(brief.includes(SOURCE.url));assert.ok(brief.includes(item[lang].caveat));assert.ok(brief.includes(item[lang].title));
 }
});
test('HTML values are escaped before rendering',()=>assert.equal(escapeHtml('<img onerror="x">&'), '&lt;img onerror=&quot;x&quot;&gt;&amp;'));
