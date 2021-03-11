export default function slideTo(
  index = 0,
  speed = this.params.speed,
  runCallbacks = true,
  internal,
) {
  if (typeof index !== 'number' && typeof index !== 'string') {
    throw new Error(
      `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index}] given.`,
    );
  }
}
