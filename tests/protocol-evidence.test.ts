import {test} from 'node:test';
import assert from 'node:assert/strict';
import {summarizeProtocolEvidence} from '../src/lib/protocol';
import {guideVisual} from '../src/lib/guide-visuals';
test('counts observed calendar days, not number of notes, and excludes outside window',()=>{
assert.deepEqual(summarizeProtocolEvidence('2026-09-01T10:00:00Z',new Date('2026-09-03T12:00:00Z'),[{createdAt:'2026-09-01T11:00:00Z'},{createdAt:'2026-09-01T12:00:00Z'},{createdAt:'2026-08-31T12:00:00Z'},{createdAt:'2026-09-04T12:00:00Z'}]),{noteCount:2,observedDays:1,noNoteDays:2});
});
test('empty journal never implies observation or adherence',()=>{assert.deepEqual(summarizeProtocolEvidence('2026-09-01T10:00:00Z',new Date('2026-09-01T11:00:00Z'),[]),{noteCount:0,observedDays:0,noNoteDays:1})});
test('each published routine has a different portrait',()=>{const slugs=['glass-skin','sensitive-barrier','brightening','minimalist','men','winter','summer','acne-prone','anti-aging','pregnancy-safe','teen'];assert.equal(new Set(slugs.map(guideVisual)).size,slugs.length)});
