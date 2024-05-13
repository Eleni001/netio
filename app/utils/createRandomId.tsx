export default function createRandomId() {
  return `id_${Date.now()}_${Math.random().toString(15).slice(2, 9)}`;
}
