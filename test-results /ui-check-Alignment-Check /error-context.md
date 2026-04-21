# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui-check.spec.ts >> Alignment Check
- Location: tests\ui-check.spec.ts:45:5

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 10
Received:   555.0000228881836
```-name','standard_user');
  8  |   await page.fill('#password','secret_sauce');
  9  |   await page.click('#login

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { getStyle, getWidth, getHeight, getPosition, getBoxModel } from '../utils/styleHelper';
  3  | import { logBug, saveReport } from '../utils/reporter';
  4  | 
  5  | async function login(page){
  6  |   await page.goto('https://www.saucedemo.com/');
  7  |   await page.fill('#user-button');
  10 |   await page.waitForURL('**/inventory.html');
  11 | }
  12 | 
  13 | test('Font Check', async ({ page }) => {
  14 |   await login(page);
  15 |   const el = page.locator('.title');
  16 |   const font = parseFloat(await getStyle(el,'font-size'));
  17 |   if(!(font>12 && font<80)) logBug('Font issue',font);
  18 |   expect(font).toBeGreaterThan(12);
  19 | });
  20 | 
  21 | test('Width Check', async ({ page }) => {
  22 |   await login(page);
  23 |   const el = page.locator('.inventory_item').first();
  24 |   const width = await getWidth(el);
  25 |   if(width<50) logBug('Width issue',width);
  26 |   expect(width).toBeGreaterThan(50);
  27 | });
  28 | 
  29 | test('Height Check', async ({ page }) => {
  30 |   await login(page);
  31 |   const el = page.locator('.inventory_item').first();
  32 |   const height = await getHeight(el);
  33 |   if(height<20) logBug('Height issue',height);
  34 |   expect(height).toBeGreaterThan(20);
  35 | });
  36 | 
  37 | test('Box Model Check', async ({ page }) => {
  38 |   await login(page);
  39 |   const el = page.locator('.inventory_item').first();
  40 |   const box = await getBoxModel(el);
  41 |   if(!box.padding) logBug('Padding missing',box);
  42 |   expect(box.padding).not.toBe('');
  43 | });
  44 | 
  45 | test('Alignment Check', async ({ page }) => {
  46 |   await login(page);
  47 |   const el1 = page.locator('.inventory_item').nth(0);
  48 |   const el2 = page.locator('.inventory_item').nth(1);
  49 |   const pos1 = await getPosition(el1);
  50 |   const pos2 = await getPosition(el2);
  51 |   if(pos1 && pos2 && Math.abs(pos1.x-pos2.x)>10){
  52 |     logBug('Alignment issue',{x1:pos1.x,x2:pos2.x});
  53 |   }
> 54 |   expect(Math.abs(pos1.x-pos2.x)).toBeLessThan(10);
     |                                   ^ Error: expect(received).toBeLessThan(expected)
  55 | });
  56 | 
  57 | test('Spacing Check', async ({ page }) => {
  58 |   await login(page);
  59 |   const el1 = page.locator('.inventory_item').nth(0);
  60 |   const el2 = page.locator('.inventory_item').nth(1);
  61 |   const pos1 = await getPosition(el1);
  62 |   const pos2 = await getPosition(el2);
  63 |   const gap = pos2.y - (pos1.y + pos1.height);
  64 |   if(gap<0) logBug('Overlap issue',gap);
  65 |   expect(gap).toBeGreaterThanOrEqual(0);
  66 | });
  67 | 
  68 | test.afterAll(async ()=>{
  69 |   saveReport();
  70 | });
```
