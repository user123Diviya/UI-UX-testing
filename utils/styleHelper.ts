export async function getStyle(locator, property: string) {
  return await locator.evaluate((el, prop) => {
    return window.getComputedStyle(el).getPropertyValue(prop);
  }, property);
}
export async function getWidth(locator) {
  return await locator.evaluate(el => el.offsetWidth);
}
export async function getHeight(locator) {
  return await locator.evaluate(el => el.offsetHeight);
}
export async function getPosition(locator) {
  return await locator.boundingBox();
}
export async function getBoxModel(locator) {
  return await locator.evaluate(el => {
    const style = window.getComputedStyle(el);
    return {
      margin: style.margin,
      padding: style.padding,
      border: style.border
    };
  });
}
